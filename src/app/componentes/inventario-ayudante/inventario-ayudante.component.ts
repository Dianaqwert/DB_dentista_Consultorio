import { CommonModule } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { FormsModule, Validators,AbstractControl,ValidationErrors, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StockMaterialService } from '../../services/stock-material.service';
import { TipoMaterialService } from '../../services/material.service';

// Validador de caracteres repetidos (reutilizado)
export function noRepetitiveCharacters(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  if (!value) return null;
  const hasRepetition = /(.)\1{2,}/.test(value);
  const patternRepeat = /(.{2,})\1{2,}/.test(value);
  return (hasRepetition || patternRepeat) ? { repetitive: true } : null;
}

@Component({
  standalone:true,
  selector: 'app-inventario-ayudante',
  imports: [FormsModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './inventario-ayudante.component.html',
  styleUrl: './inventario-ayudante.component.css'
})
export class InventarioAyudanteComponent implements OnInit {

  // Catálogos y Datos
  listaMateriales: any[] = [];
  tiposMaterial: any[] = []; // Del TipoMaterialService
  
  // Formularios
  formAlta: FormGroup;
  formEdicion: FormGroup;
  
  // Variables de Estado
  materialEnEdicion: any | null = null;
  terminoBusqueda: string = '';
  soloNumeros = /^[0-9]+$/;

  constructor(
    private fb: FormBuilder,
    private stockMaterialService: StockMaterialService, // Usamos este para CRUD
    private tipoMaterialService: TipoMaterialService // Usamos este para el catálogo
  ) {
    // Formulario de ALTA
    this.formAlta = this.fb.group({
      nombre: ['', [
        Validators.required, 
        Validators.maxLength(100), 
        noRepetitiveCharacters
      ]],
      costounitario: ['', [
        Validators.required, 
        Validators.min(1), 
        Validators.pattern(this.soloNumeros)
      ]],
      stock: ['', [
        Validators.required, 
        Validators.min(0), 
        Validators.pattern(this.soloNumeros)
      ]],
      cantidad: [1, [
        Validators.required, 
        Validators.min(1), 
        Validators.pattern(this.soloNumeros)
      ]],
      id_tipo_material: [null, Validators.required]
    });
    
    // Formulario de EDICIÓN
    this.formEdicion = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100), noRepetitiveCharacters]],
      costounitario: ['', [Validators.required, Validators.min(1), Validators.pattern(this.soloNumeros)]],
      stock: ['', [Validators.required, Validators.min(0), Validators.pattern(this.soloNumeros)]],
      cantidad: [1, [Validators.required, Validators.min(1), Validators.pattern(this.soloNumeros)]],
      id_tipo_material: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarMateriales();
    this.cargarTiposMaterial();
  }

  // --- LECTURA DE DATOS ---
  cargarMateriales() {
    this.stockMaterialService.getMateriales().subscribe({ // <-- Llama a getMateriales
      next: (data) => this.listaMateriales = data,
      error: (e) => console.error('Error cargando lista de materiales:', e)
    });
  }

  cargarTiposMaterial() {
    this.tipoMaterialService.getTiposMateriales().subscribe({ // <-- Llama a getTiposMateriales
      next: (data) => this.tiposMaterial = data,
      error: (e) => console.error('Error cargando tipos de material:', e)
    });
  }

  buscarMaterial() {
    if (this.terminoBusqueda) {
      this.stockMaterialService.buscarMateriales(this.terminoBusqueda).subscribe({ // <-- Llama a buscarMateriales
        next: (data) => this.listaMateriales = data,
        error: (e) => console.error('Error en la búsqueda:', e)
      });
    } else {
      this.cargarMateriales();
    }
  }
  
  // --- ALTA (CREAR) ---
  // --- GESTIÓN DE CATEGORÍAS ---
  crearCategoria(nombre: string) {
    if (!nombre || nombre.trim() === '') return;
    
    const nombreLimpio = nombre.toUpperCase();

    // Enviamos solo el string, no el objeto completo
    this.tipoMaterialService.crearTipoMaterial(nombreLimpio).subscribe({
      next: (res) => {
        alert('Categoría agregada con éxito.');
        this.cargarTiposMaterial();
      },
      error: (e) => alert('Error: ' + e.message)
    });
  }

  //material
  guardarMaterial() {
    if (this.formAlta.invalid) {
      this.formAlta.markAllAsTouched();
      return;
    }
    
    this.stockMaterialService.crearMaterial(this.formAlta.value).subscribe({ // <-- Llama a crearMaterial
      next: (res) => {
        alert(res.message || 'Material registrado exitosamente.');
        this.formAlta.reset({ cantidad: 1, stock: 0, costounitario: 0, id_tipo_material: null });
        this.cargarMateriales();
      },
      error: (e) => {
        alert('Error al registrar: ' + (e.error.message || 'Error desconocido.'));
      }
    });
  }

  // --- EDICIÓN (UPDATE) ---
  editarMaterial(material: any) {
    this.materialEnEdicion = material;
    this.formEdicion.patchValue({
      nombre: material.nombre,
      costounitario: material.costounitario,
      stock: material.stock,
      cantidad: material.cantidad,
      id_tipo_material: material.id_tipo_material
    });
    const modalElement = document.getElementById('modalEdicion');
    if (modalElement) {
        (window as any).bootstrap.Modal.getOrCreateInstance(modalElement).show();
    }
  }

  guardarEdicion() {
    if (this.formEdicion.invalid || !this.materialEnEdicion) {
        this.formEdicion.markAllAsTouched();
        return;
    }
    
    // Asegúrate de que el objeto material en tu servicio tenga el ID
    const datosUpdate = { ...this.formEdicion.value, id_material: this.materialEnEdicion.id_material };
    
    this.stockMaterialService.actualizarMaterial(datosUpdate).subscribe({ // <-- Llama a actualizarMaterial
        next: (res) => {
            alert(res.message || 'Material actualizado exitosamente.');
            this.cargarMateriales();
            this.cerrarModal();
        },
        error: (e) => {
            alert('Error al actualizar: ' + (e.error.message || 'Error desconocido.'));
        }
    });
  }

  // --- BAJA (DELETE) ---
  eliminarMaterial(id: number) {
    if (!confirm('¿Estás seguro de que deseas eliminar este material?')) return;
    
    this.stockMaterialService.eliminarMaterial(id).subscribe({ // <-- Llama a eliminarMaterial
      next: (res) => {
        alert(res.message || 'Material eliminado exitosamente.');
        this.cargarMateriales();
      },
      error: (e) => {
        alert('Error al eliminar: ' + (e.error.message || 'Error desconocido.'));
      }
    });
  }
  
  // --- UI/HELPERS ---
  cerrarModal() {
    this.materialEnEdicion = null;
    this.formEdicion.reset();
    const modalElement = document.getElementById('modalEdicion');
    if (modalElement) {
        (window as any).bootstrap.Modal.getInstance(modalElement)?.hide();
    }
  }
  
  obtenerNombreTipo(id: number): string {
      const tipo = this.tiposMaterial.find(t => t.id_tipo_material === id);
      return tipo ? tipo.nombre_tipo : 'Desconocido';
  }
}