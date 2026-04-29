import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PacientesService } from '../../services/pacientes.service';

declare var bootstrap: any;
const SOLO_LETRAS = '^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]+$';

@Component({
  standalone:true,
  selector: 'app-atencion-cita',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,
  ],
  templateUrl: './atencion-cita.component.html',
  styleUrl: './atencion-cita.component.css'
})

export class AtencionCitaComponent implements OnInit{
@Input() citaSeleccionada: any; // Recibimos la cita desde la tabla de agenda
  @Output() atencionGuardada = new EventEmitter<boolean>(); // Avisar al padre para recargar la tabla

  atencionForm: FormGroup;
  // Catálogos para los Selects
  catalogoTratamientos: any[] = [];
  catalogoMateriales: any[] = [];
  // Variable para mostrar el total en tiempo real
  totalDeudaEstimada: number = 0;
  totalMaterialExtra: number = 0; // Para el costo de los insumos sueltos
  //derivaciones y estudios
  estudioTemporal: string = '';
  listaEstudios: any[] = [];


  constructor(
    private fb: FormBuilder,
    private pacientesService: PacientesService
  ) {

    this.atencionForm = this.fb.group({
      // DATOS CLÍNICOS
      alergias: [''],
      enfermedades: [''],
      avanceTratamiento: ['', Validators.required], // Nota de evolución obligatoria
      
      // ARRAYS DINÁMICOS
      consumoMateriales: this.fb.array([]), 
      tratamientos: this.fb.array([]),
      derivaciones: this.fb.array([]),
      estudios: this.fb.array([]),

    });
  }

  ngOnInit(): void {
    this.cargarCatalogos();
  }

  //cambios -> se detectan cambios en la cita seleccionada para cargas datos precios SI EXISTEN
  ngOnChanges(changes:SimpleChanges):void{
    if (changes['citaSeleccionada'] && this.citaSeleccionada) {
        
        // 1. Limpiamos el formulario primero
        this.limpiarFormulario();

        // 2. Decidimos qué cargar
        if (this.citaSeleccionada.estado_cita === 'Atendida') {
            // MODO EDICIÓN: Cargar lo que se guardó en ESTA cita
            this.cargarDatosEdicion(this.citaSeleccionada.id_cita);
        } else {
            // MODO NUEVA ATENCIÓN: Pre-cargar antecedentes del paciente
            this.cargarAntecedentesPrevios(this.citaSeleccionada.id_paciente);
        }
    }
  }

  limpiarFormulario() {
      this.atencionForm.reset();
      this.tratamientosArray.clear();
      this.derivacionesArray.clear();
      this.consumoMaterialesArray.clear(); // <-- Limpiar el nuevo array

      this.estudiosArray.clear();
      this.totalDeudaEstimada = 0;
  }


  cargarDatosEdicion(idCita: number) {
      this.pacientesService.getDetalleCita(idCita).subscribe({
          next: (data) => {
              // A. Rellenar Textos (Historial)
              if (data.historial) {
                  this.atencionForm.patchValue({
                      alergias: data.historial.alergias,
                      enfermedades: data.historial.enfermedades,
                      avanceTratamiento: data.historial.avancetratamiento // Ojo con mayúsculas/minúsculas de tu DB
                  });
              }

              // B. Rellenar Tabla de Tratamientos (FormArray)
              if (data.tratamientos && data.tratamientos.length > 0) {
                  data.tratamientos.forEach((trat: any) => {
                      this.agregarTratamientoExistente(trat);
                  });
              }
              
              // Recalcular total visual
              this.calcularTotalGeneral();
          },
          error: (err) => console.error('Error cargando datos de edición', err)
      });
  }

  // Método auxiliar para empujar datos al array
  agregarTratamientoExistente(datos: any) {
      const tratamientoGroup = this.fb.group({
          id_tipo_tratamiento: [datos.id_tipo_tratamiento, Validators.required],
          id_tipo_material: [datos.id_tipo_material], 
          cantidad: [datos.cantidad, [Validators.required, Validators.min(1)]]
      });
      this.tratamientosArray.push(tratamientoGroup);
  }

  // --- CARGA DE DATOS ---
  /*cargarCatalogos() {
    // Necesitas estos métodos en tu servicio (ver paso 2)
    this.pacientesService.getListaTratamientos().subscribe(data => this.catalogoTratamientos = data);
    this.pacientesService.getListaMateriales().subscribe(data => this.catalogoMateriales = data);
  }*/


  // --- GETTERS PARA EL HTML---
  get tratamientosArray() { return this.atencionForm.get('tratamientos') as FormArray; }
  get derivacionesArray() { return this.atencionForm.get('derivaciones') as FormArray; }
  get estudiosArray() { return this.atencionForm.get('estudios') as FormArray; }
  get consumoMaterialesArray() { return this.atencionForm.get('consumoMateriales') as FormArray; }


  // --- LÓGICA DE TRATAMIENTOS Y COSTOS ---
  agregarTratamiento() {
    const tratamientoGroup = this.fb.group({
      id_tipo_tratamiento: [null, Validators.required],
      id_tipo_material: [null], // Puede ser null si no usa material extra
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });
    this.tratamientosArray.push(tratamientoGroup);
  }

  eliminarTratamiento(index: number) {
    this.tratamientosArray.removeAt(index);
    this.calcularTotalGeneral(); // Recalcular al borrar
  }


  // Crear un grupo de material suelto
  crearMaterialGroup() {
    return this.fb.group({
      id_tipo_material: [null, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });
  }

  // Agregar una fila solo de material
  agregarMaterialExtra() {
    this.consumoMaterialesArray.push(this.crearMaterialGroup());
  }

  eliminarMaterialExtra(index: number) {
    this.consumoMaterialesArray.removeAt(index);
    this.calcularTotalGeneral();
  }

  // Se llama cada vez que cambian el tratamiento o la cantidad en el HTML
  actualizarCosto(index: number) {
    this.calcularTotalGeneral();
  }

  // Obtiene el costo unitario del material seleccionado
  obtenerCostoMaterial(idMaterial: number): number {
    const material = this.catalogoMateriales.find(m => m.id_tipo_material == idMaterial);
    // Asumimos que tu catálogo de materiales tiene el campo 'costoUnitario'
    return material ? material.costoUnitario || 0 : 0;
  }

  obtenerCostoEstimado(index: number, arrayName: 'tratamientos' | 'materiales'): number {
      let row: any; // <--- SOLUCIÓN AL ERROR DE TIPADO
      let costoUnitario = 0;
      let cantidad = 0;

      if (arrayName === 'tratamientos') {
          row = this.tratamientosArray.at(index).value;
          // Buscamos el precio en el catálogo de tratamientos
          const tratamiento = this.catalogoTratamientos.find(t => t.id_tipo_tratamiento == row.id_tipo_tratamiento);
          costoUnitario = tratamiento ? tratamiento.costo : 0;
          cantidad = row.cantidad;
          
      } else if (arrayName === 'materiales') {
          row = this.consumoMaterialesArray.at(index).value;
          cantidad = row.cantidad;
          // Buscamos el precio en el catálogo de materiales (se cobra al costo unitario)
          costoUnitario = this.obtenerCostoMaterial(row.id_tipo_material);
      }
      
      return costoUnitario * cantidad;
  }

  calcularTotalGeneral() {
    this.totalDeudaEstimada = 0;
    this.totalMaterialExtra = 0;

    // 1. Sumar Tratamientos
    for (let i = 0; i < this.tratamientosArray.length; i++) {
      this.totalDeudaEstimada += this.obtenerCostoEstimado(i, 'tratamientos');
    }
    
    // 2. Sumar Materiales Extra
    for (let i = 0; i < this.consumoMaterialesArray.length; i++) {
        const costoMaterial = this.obtenerCostoEstimado(i, 'materiales');
        this.totalDeudaEstimada += costoMaterial;
        this.totalMaterialExtra += costoMaterial; // Guardamos el subtotal de materiales por separado
    }
  }

  // --- LÓGICA DE DERIVACIONES Y ESTUDIOS ---
  agregarDerivacion() {
    this.derivacionesArray.push(this.fb.group({
      nombreDentista: ['', [Validators.required,Validators.pattern(SOLO_LETRAS)]],
      apellidoPatDentista: ['', [Validators.required, Validators.pattern(SOLO_LETRAS)]],
      apellidoMatDentista: ['', [Validators.required, Validators.pattern(SOLO_LETRAS)]],
      especialidadDentista: ['', [Validators.required,Validators.pattern(SOLO_LETRAS)]],
      motivo: ['', Validators.required]
    }));
  }

  eliminarDerivacion(index: number) { 
    this.derivacionesArray.removeAt(index); 
  }

  agregarEstudio() {
    this.estudiosArray.push(this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['']
    }));
  }

  eliminarEstudio(index: number) { 
    this.estudiosArray.removeAt(index); 
  }

  // --- GUARDADO FINAL ---
  guardarAtencion() {
    if (this.atencionForm.invalid) {
      this.atencionForm.markAllAsTouched();
      alert('Faltan campos obligatorios en el formulario.');
      return;
    }

    // 1. MAPEO DE ESTUDIOS
    // Agregamos 'resultados' vacío para que el backend no falle si espera algo
    const estudiosMapeados = this.atencionForm.value.estudios.map((e: any) => ({
        nombre: e.nombre,
        descripcion: e.descripcion || 'Sin descripción',
        resultados: 'Pendiente', // <--- IMPORTANTE: Valor por defecto
        fecha_hora: new Date().toISOString().split('T')[0] // <--- IMPORTANTE: Fecha actual
    }));

    // 2. MAPEO DE DERIVACIONES
    const derivacionesMapeadas = this.atencionForm.value.derivaciones.map((d: any) => ({
        nombreDentista: d.nombreDentista,
        apellidoPatDentista: d.apellidoPatDentista,
        apellidoMatDentista: d.apellidoMatDentista,
        especialidadDentista: d.especialidadDentista,
        motivo: d.motivo,
        fecha: new Date().toISOString().split('T')[0] // <--- IMPORTANTE
    }));

    // 3. CONSTRUCCIÓN DEL OBJETO FINAL
    const datosAtencion = {
      id_cita: this.citaSeleccionada.id_cita,
      id_paciente: this.citaSeleccionada.id_paciente,
      
      // Datos simples
      alergias: this.atencionForm.value.alergias || 'Ninguna',
      enfermedades: this.atencionForm.value.enfermedades || 'Ninguna',
      avanceTratamiento: this.atencionForm.value.avanceTratamiento,
      total_deuda: this.totalDeudaEstimada,
      
      tratamientos: this.atencionForm.value.tratamientos,
      insumos_extra: this.atencionForm.value.consumoMateriales,
      // Arrays Mapeados
      estudios: estudiosMapeados,       // Enviamos el array limpio
      derivaciones: derivacionesMapeadas, // Enviamos el array limpio

      // Items de Cobro
      items_cobro: [
        ...this.atencionForm.value.tratamientos,
        ...this.atencionForm.value.consumoMateriales.map((m: any) => ({
            ...m,
            id_tipo_tratamiento: null 
        }))
      ]
    };

    console.log("Enviando al Backend:", datosAtencion);

    this.pacientesService.registrarAtencionCompleta(datosAtencion).subscribe({
      next: (resp) => {
        alert('¡Atención guardada correctamente!');
        this.cerrarModal();
        this.atencionGuardada.emit(true);
      },
      error: (err) => {
        console.error(err);
        alert('Error al guardar: ' + (err.error?.message || 'Revisa la consola'));
      }
    });
  }

  cargarCatalogos() {
    this.pacientesService.getListaTratamientos().subscribe({
        next: (data) => this.catalogoTratamientos = data,
        error: (err) => console.error('Error cargando tratamientos', err)
    });

    this.pacientesService.getListaMateriales().subscribe({
        next: (data) => this.catalogoMateriales = data,
        // Tu catálogo de materiales necesita tener el COSTO UNITARIO para calcular el subtotal
        error: (err) => console.error('Error cargando materiales', err)
    });
  }

  cerrarModal() {
    // Lógica para cerrar modal Bootstrap 5
    const modalElement = document.getElementById('modalAtencion');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
    this.limpiarFormulario(); // Usar la función de limpieza centralizada

  }

  cargarAntecedentesPrevios(idPaciente: number) {
      this.pacientesService.getUltimoHistorial(idPaciente).subscribe({
          next: (data) => {
              if (data) {
                  // Solo parcheamos alergias y enfermedades (no el avance, porque ese es nuevo)
                  this.atencionForm.patchValue({
                      alergias: data.alergias || '',
                      enfermedades: data.enfermedades || ''
                  });
              }
          },
          error: (err) => console.warn('El paciente no tiene historial previo o hubo error', err)
      });
  }

}