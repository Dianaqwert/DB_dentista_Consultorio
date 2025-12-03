import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CitasService } from '../../services/citas.service';
import { Cita } from '../../interfaces/Cita';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  standalone:true,
  selector: 'app-citas-gestionar-r',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './citas-gestionar-r.component.html',
  styleUrl: './citas-gestionar-r.component.css'
})
export class CitasGestionarRComponent {

  // Variables de datos
  listaCitas: Cita[] = [];
  listaDentistas: any[] = []; // Para el select del modal

  // Variables de filtros
  filtroFecha: string = '';
  filtroEstado: string = 'Todos';

  mostrarModalReprogramacion: boolean = false;
  formReprogramar: FormGroup;
  citaEnEdicion: Cita | null = null;
  idRecepcionistaActual: number = 1;

  constructor(
      private citasService: CitasService,
      private empleadosService: EmpleadosService,
      private fb: FormBuilder
  ) {
      // Formulario para el modal
      this.formReprogramar = this.fb.group({
          fecha: ['', Validators.required],
          hora: ['', Validators.required],
          id_dentista: ['', Validators.required]
      });
  }

  ngOnInit(): void {
    // 1. Al iniciar, establecemos la fecha de HOY por defecto
    const hoy = new Date();
    // Formato YYYY-MM-DD para que el input type="date" lo lea bien
    this.filtroFecha = hoy.toISOString().split('T')[0];

    // 2. Cargamos la lista inicial
    this.cargarCitas();
    this.cargarDentistas(); // Cargar catálogo al inicio

  }

  // Se ejecuta al cambiar la fecha o el select de estado
  cargarCitas() {
    // Si el select dice 'Todos', mandamos string vacío o null al servicio
    const estadoEnviar = this.filtroEstado === 'Todos' ? '' : this.filtroEstado;

    this.citasService.getCitas(this.filtroFecha, estadoEnviar).subscribe({
      next: (data) => {
        this.listaCitas = data;
      },
      error: (e) => {
        console.error('Error cargando citas:', e);
      }
    });
  }

  cargarDentistas() {
      this.empleadosService.filtrarPorTipo('Dentista').subscribe({
          next: (data) => this.listaDentistas = data,
          error: (e) => console.error('Error cargando dentistas', e)
      });
  }

  // Lógica para el botón "Cambiar" del dropdown
  cambiarEstado(cita: Cita, nuevoEstado: string) {
    // CASO ESPECIAL: REPROGRAMACIÓN
    if (nuevoEstado === 'Reprogramada') {
        this.abrirModalReprogramacion(cita);
        return; 
    }
    // Confirmación simple (opcional)
    if (!confirm(`¿Estás seguro de cambiar el estado a "${nuevoEstado}"?`)) {
      return;
    }

    this.citasService.actualizarEstado(cita.id_cita, nuevoEstado).subscribe({
      next: () => {
        // Actualizamos visualmente la fila sin recargar todo (más rápido)
        // Ojo: TypeScript se puede quejar si el tipo 'string' no coincide exactamente con el tipo literal
        // por eso hacemos un casting rápido o simplemente asignamos.
        cita.estado_cita = nuevoEstado as any; 
        alert(`Cita actualizada a: ${nuevoEstado}`);
      },
      error: (err) => {
        console.error(err);
        alert('Error al actualizar: ' + (err.error.error || 'Intente de nuevo'));
      }
    });
  }

  abrirModalReprogramacion(cita: Cita) {
      this.citaEnEdicion = cita;
      this.mostrarModalReprogramacion = true;

      // Precargar datos actuales en el formulario
      // (Si quieres que aparezca vacío para obligar a elegir, quita los valores por defecto)
      this.formReprogramar.patchValue({
          fecha: cita.fecha_hora ? cita.fecha_hora.split('T')[0] : '',
          hora: cita.hora,
          id_dentista: cita.id_dentista || '' // Asegúrate que tu interfaz Cita tenga id_dentista opcional
      });
  }

  cerrarModal() {
      this.mostrarModalReprogramacion = false;
      this.citaEnEdicion = null;
      this.formReprogramar.reset();
  }

  guardarReprogramacion() {
      if (this.formReprogramar.invalid || !this.citaEnEdicion) {
          this.formReprogramar.markAllAsTouched();
          return;
      }

      const datos = {
          ...this.formReprogramar.value,
          id_recepcionista: this.idRecepcionistaActual // Se envía quién hizo el cambio
      };

      this.citasService.reprogramarCita(this.citaEnEdicion.id_cita, datos).subscribe({
          next: (res) => {
              alert('Cita reprogramada con éxito');
              this.cerrarModal();
              this.cargarCitas(); // Recargar la tabla para ver cambios
          },
          error: (err) => {
              console.error(err);
              alert('Error al reprogramar: ' + (err.error.error || err.message));
          }
      });
  }

  // Devuelve la clase de Bootstrap para colorear el Badge según el estado
  getClaseEstado(estado: string): string {
    switch (estado) {
      case 'Agendada': return 'text-bg-primary';     // Azul
      case 'Confirmada': return 'text-bg-info';      // Azul claro
      case 'Atendida': return 'text-bg-success';     // Verde
      case 'Pendiente': return 'text-bg-warning';    // Amarillo
      case 'Reprogramada': return 'text-bg-secondary'; // Gris
      case 'Cancelada': return 'text-bg-danger';     // Rojo
      case 'No asistio': return 'text-bg-dark';      // Negro
      default: return 'text-bg-light';
    }
  }
}

/*Agendada','Confirmada','Cancelada','Pendiente','Reprogramada','Atendida','No asistio')),*/
