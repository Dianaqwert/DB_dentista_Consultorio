import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { FormsModule } from '@angular/forms';
import { CategoriaAgrupada } from '../../interfaces/inventarioGen';
import { TipoMaterial } from '../../interfaces/tipoMaterial';
import { TipoMaterialService } from '../../services/material.service';
import { StockMaterialService } from '../../services/stock-material.service';
import { materialStock } from '../../interfaces/materialStock';
import { AuthserviceService } from '../../services/authservice.service'; // ✅ NUEVA IMPORTACIÓN

@Component({
    selector: 'app-inventario-d',
    standalone:true,
    imports: [CommonModule,FormsModule],
    templateUrl: './inventario-d.component.html',
    styleUrl: './inventario-d.component.css'
})
export class InventarioDComponent implements OnInit{

    usuario: any;
    listaBajoStock: any[] = [];
    listaAltoValor: any[] = [];
    inventarioGeneral: CategoriaAgrupada[] = [];  

    inputLimiteStock: number = 10;  
    inputMontoMinimo: number = 500;  

    listaTiposMateriales: TipoMaterial[] = [];
    nombreNuevoTipo: string = '';
    terminoBusqueda: string = '';
    listaFiltrada: TipoMaterial[] = [];
    busquedaActiva: boolean = false;

    listaMateriales: materialStock[] = [];
    terminoBusquedaMaterial: string = '';
    listaMaterialesFiltrada: materialStock[] = [];
    busquedaMaterialActiva: boolean = false;
    materialNuevo: materialStock = {
        nombre: '',
        costounitario: 0,
        stock: 0,
        cantidad: 1,
        id_tipo_material: 0
    };

    materialEditando: materialStock | null = null;

    constructor(
        private inventarioService: InventarioService,
        private tipoMaterialService: TipoMaterialService,
        private materialService: StockMaterialService,
        private authService: AuthserviceService // ✅ INYECCIÓN DEL SERVICIO DE AUTH
    ) {}


    ngOnInit() {
        // ✅ Obtener usuario del servicio de Auth, que es la fuente más confiable
        this.usuario = this.authService.getUsuario();

        // Si el usuario no está logueado, redirigir (lógica de guardias)

        this.cargarInventarioGeneral();
        this.filtrarBajoStock();
        this.filtrarAltoValor();
        this.cargarTiposMateriales();
        this.cargarMateriales();
    }

    cargarMateriales(): void {
        this.busquedaMaterialActiva = false;
        this.terminoBusquedaMaterial = '';

        this.materialService.getMateriales().subscribe({
            next: (data: materialStock[]) => {
                this.listaMateriales = data;
                this.listaMaterialesFiltrada = data;
            },
            error: (e: any) => {
                console.error('Error cargando materiales:', e);
                alert('Error al cargar la lista de materiales.');
            }
        });
    }

    ejecutarBusquedaMaterial(): void {
        const term = this.terminoBusquedaMaterial.trim();

        if (!term) {
            this.busquedaMaterialActiva = false;
            this.listaMaterialesFiltrada = this.listaMateriales;
            return;
        }

        this.busquedaMaterialActiva = true;

        this.materialService.buscarMateriales(term).subscribe({
            next: (data: materialStock[]) => {
                this.listaMaterialesFiltrada = data;
                if (data.length === 0) {
                    alert('No se encontraron materiales que coincidan.');
                }
            },
            error: (e: any) => {
                console.error('Error durante la búsqueda de material:', e);
                alert('Error al intentar buscar el material.');
                this.listaMaterialesFiltrada = [];
            }
        });
    }

    crearMaterial(): void {
        if (this.materialNuevo.id_tipo_material === 0 || !this.materialNuevo.nombre.trim()) {
            alert('Debe completar todos los campos y seleccionar una categoría.');
            return;
        }

        const usuarioLogueado = this.authService.getUsuario();

        if (!usuarioLogueado || !usuarioLogueado.id) {
            alert('Error de autenticación: No se encontró el ID del empleado logueado.');
            return;
        }

        // ✅ CREAR EL OBJETO A ENVIAR, AGREGANDO EL ID DEL CREADOR (asumiendo que el ID se llama 'id' en el objeto del localStorage)
        const materialConCreador = {
            ...this.materialNuevo,
            id_empleado_creador: usuarioLogueado.id
        };

        this.materialService.crearMaterial(materialConCreador).subscribe({
            next: (response: { id_material: number, message: string }) => {
                alert(`Material '${this.materialNuevo.nombre}' creado con ID: ${response.id_material}`);
                this.resetFormularioMaterial();
                this.cargarMateriales();
            },
            error: (e: any) => {
                console.error('Error al crear material:', e);
                alert('Error al crear el material. Verifique que la categoría exista y el backend acepte el ID de creador.');
            }
        });
    }

    iniciarEdicion(material: materialStock): void {
        this.materialEditando = {...material};
        document.getElementById('formularioEdicionMaterial')?.scrollIntoView({ behavior: 'smooth' });
    }

    guardarEdicion(): void {
        if (!this.materialEditando || !this.materialEditando.id_material) {
            alert('Error: No se ha seleccionado un material para editar.');
            return;
        }

        if (this.materialEditando.id_tipo_material === 0 || !this.materialEditando.nombre.trim()) {
            alert('Debe completar todos los campos y seleccionar una categoría.');
            return;
        }

        this.materialService.actualizarMaterial(this.materialEditando).subscribe({
            next: (response: { message: string }) => {
                alert(response.message);
                this.cancelarEdicion();
                this.cargarMateriales();
            },
            error: (e: any) => {
                console.error('Error al actualizar material:', e);
                alert('Error al actualizar el material. Verifique los datos.');
            }
        });
    }

    cancelarEdicion(): void {
        this.materialEditando = null;
    }


    eliminarMaterial(id: number | undefined, nombre: string): void {
        if (!id) return;

        if (confirm(`¿Está seguro de eliminar el material: ${nombre} (ID: ${id})?`)) {
            this.materialService.eliminarMaterial(id).subscribe({
                next: (response: { message: string }) => {
                    alert(response.message || 'Material eliminado.');
                    this.cargarMateriales();
                },
                error: (e: any) => {
                    console.error('Error al eliminar material:', e);
                    alert('Error al intentar eliminar el material.');
                }
            });
        }
    }

    resetFormularioMaterial(): void {
        this.materialNuevo = {
            nombre: '',
            costounitario: 0,
            stock: 0,
            cantidad: 1,
            id_tipo_material: 0
        };
    }

    getNombreCategoria(idTipoMaterial: number | undefined): string {
        if (!idTipoMaterial) {
            return 'N/A';
        }

        const categoria = this.listaTiposMateriales.find(
            c => c.id_tipo_material === idTipoMaterial
        );

        return categoria?.nombre_tipo ?? 'N/A';
    }

    cargarInventarioGeneral() {
        this.inventarioService.getInventarioGeneral().subscribe({
            next: (data: any) => this.inventarioGeneral = data,
            error: (e: any) => console.error(e)
        });
    }

    filtrarBajoStock() {
        this.inventarioService.getBajoStock(this.inputLimiteStock).subscribe({
            next: (data: any) => this.listaBajoStock = data,
            error: (e: any) => console.error(e)
        });
    }

    filtrarAltoValor() {
        this.inventarioService.getAltoValor(this.inputMontoMinimo).subscribe({
            next: (data: any) => this.listaAltoValor = data,
            error: (e: any) => console.error(e)
        });
    }

    cargarTiposMateriales(): void {
        this.busquedaActiva = false;
        this.terminoBusqueda = '';  

        this.tipoMaterialService.getTiposMateriales().subscribe({
            next: (data: TipoMaterial[]) => {
                this.listaTiposMateriales = data;
                this.listaFiltrada = data;
            },
            error: (e: any) => {
                console.error('Error al cargar tipos de material:', e);
                alert('Error: No se pudieron cargar las categorías de material.');
            }
        });
    }

    ejecutarBusqueda(): void {
        const term = this.terminoBusqueda.trim();

        if (!term) {
            this.busquedaActiva = false;
            this.listaFiltrada = this.listaTiposMateriales;
            return;
        }

        this.busquedaActiva = true;

        this.tipoMaterialService.buscarTiposMateriales(term).subscribe({
            next: (data: TipoMaterial[]) => {
                this.listaFiltrada = data;
                if (data.length === 0) {
                    alert('No se encontraron tipos de material con ese ID o nombre.');
                }
            },
            error: (e: any) => {
                console.error('Error durante la búsqueda:', e);
                alert('Error al intentar buscar la categoría.');
                this.listaFiltrada = [];
            }
        });
    }

    crearTipoMaterial(): void {
        if (!this.nombreNuevoTipo.trim()) {
            alert('Atención: El nombre de la categoría no puede estar vacío.');
            return;
        }

        this.tipoMaterialService.crearTipoMaterial(this.nombreNuevoTipo.trim()).subscribe({
            next: (response: any) => {
                alert(`Creado: Categoría '${this.nombreNuevoTipo}' agregada con éxito.`);
                this.nombreNuevoTipo = '';
                this.cargarTiposMateriales();
                this.cargarMateriales();
            },
            error: (e: any) => {
                console.error('Error al crear tipo de material:', e);
                alert('Error: No se pudo crear la categoría.');
            }
        });
    }

    eliminarTipoMaterial(id: number, nombre: string): void {

        if (confirm(`¿Estás seguro de eliminar la categoría: ${nombre}? Esta acción no se puede deshacer.`)) {

            this.tipoMaterialService.eliminarTipoMaterial(id).subscribe({
                next: (response: { message: string }) => {
                    if (response.message && response.message.startsWith('ERROR')) {
                        alert(`Restricción: ${response.message}`);
                    } else {
                        alert(response.message || 'Categoría eliminada con éxito.');
                        this.cargarTiposMateriales();
                        this.cargarMateriales();
                    }
                },
                error: (e: any) => {
                    console.error('Error al eliminar:', e);
                    alert('Error: No se pudo eliminar la categoría.');
                }
            });
        }
    }
}
