import { CommonModule } from '@angular/common';
import { Component,EventEmitter,Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthserviceService } from '../../services/authservice.service';
import { CitasService } from '../../services/citas.service';
import { EmpleadosService } from '../../services/empleados.service';
import { PacientesService } from '../../services/pacientes.service';

@Component({
  standalone:true,
  selector: 'app-cita-nueva-paciente-r',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './cita-nueva-paciente-r.component.html',
  styleUrl: './cita-nueva-paciente-r.component.css'
})
export class CitaNuevaPacienteRComponent {
  @Output() citaGuardada = new EventEmitter<void>(); // Para avisar al padre que cierre o refresque

  formCita: FormGroup;
  listaPacientes: any[] = [];
  listaDentistas: any[] = [];
  
  fechaMinima: string = '';
  mensajeDisponibilidad: string = '';
  esHorarioValido: boolean = false;
  cargandoDisponibilidad: boolean = false;

  idRecepcionistaActual: number | null = null;

  constructor(
    private fb: FormBuilder,
    private citasService: CitasService,
    private pacientesService: PacientesService,
    private empleadosService: EmpleadosService,
    private authService: AuthserviceService
  ) {
    this.formCita = this.fb.group({
      id_paciente: ['', [Validators.required]],
      id_dentista: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      // Validación: Solo letras, números, espacios y puntuación básica. Sin @#$
      descripcion: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/^[a-zA-Z0-9 ñÑáéíóúÁÉÍÓÚ,.\s]+$/) 
      ]]
    });
  }

  ngOnInit(): void {
    this.configurarFechaMinima();
    this.obtenerUsuarioLogueado();
    this.cargarCatalogos();
  }

  configurarFechaMinima() {
    const manana = new Date();
    manana.setDate(manana.getDate() + 1); // Sumar 1 día para que sea "diferente de hoy"
    this.fechaMinima = manana.toISOString().split('T')[0];
  }

  obtenerUsuarioLogueado() {
    const usuario = this.authService.getUsuario();
    if (usuario) {
      this.idRecepcionistaActual = usuario.id_usuario;
    } else {
      console.warn('No hay usuario en sesión');
    }
  }

  cargarCatalogos() {
    // 1. Cargar Pacientes
    this.pacientesService.getPacientes().subscribe({
      next: (data) => this.listaPacientes = data,
      error: (e) => console.error('Error cargando pacientes', e)
    });

    // 2. Cargar Dentistas
    this.empleadosService.filtrarPorTipo('Dentista').subscribe({
      next: (data) => {
        // Ajustamos según cómo venga tu API (id_empleado o id_usuario)
        this.listaDentistas = data; 
      },
      error: (e) => console.error('Error cargando dentistas', e)
    });
  }

  // Se ejecuta cada vez que cambian fecha, hora o dentista
  verificarDisponibilidad() {
    const { fecha, hora, id_dentista } = this.formCita.value;

    // Solo verificamos si los 3 campos tienen valor
    if (!fecha || !hora || !id_dentista) {
      this.mensajeDisponibilidad = '';
      this.esHorarioValido = false;
      return;
    }

    this.cargandoDisponibilidad = true;
    this.mensajeDisponibilidad = 'Verificando agenda...';

    // Convertir a ID numérico para el servicio
    const dentistaIdNum = Number(id_dentista);

    this.citasService.consultarDisponibilidad(fecha, hora, dentistaIdNum).subscribe({
      next: (res) => {
        this.cargandoDisponibilidad = false;
        if (res.disponible) {
          this.mensajeDisponibilidad = 'Horario Disponible';
          this.esHorarioValido = true;
        } else {
          this.mensajeDisponibilidad = 'Horario ocupado (elige otro)';
          this.esHorarioValido = false;
          // Marcar el campo hora con error manual para bloquear el botón
          this.formCita.get('hora')?.setErrors({ ocupado: true });
        }
      },
      error: (err) => {
        this.cargandoDisponibilidad = false;
        this.mensajeDisponibilidad = 'Error al verificar disponibilidad';
        this.esHorarioValido = false;
      }
    });
  }

  guardar() {
    if (this.formCita.invalid || !this.esHorarioValido) {
      this.formCita.markAllAsTouched();
      return;
    }

    if (!this.idRecepcionistaActual) {
      alert("Error de sesión: No se identifica al recepcionista.");
      return;
    }

    const datosCita = {
      ...this.formCita.value,
      id_recepcionista: this.idRecepcionistaActual // Usar el ID de Lalo
    };

    this.citasService.crearCita(datosCita).subscribe({
      next: () => {
        alert('Cita agendada exitosamente');
        this.formCita.reset();
        this.mensajeDisponibilidad = '';
        this.citaGuardada.emit(); // Avisar al padre
      },
      error: (err) => {
        console.error(err);
        // Mostrar mensaje detallado del backend (Trigger)
        alert('Error: ' + (err.error.error || 'No se pudo guardar la cita'));
      }
    });
  }

}
