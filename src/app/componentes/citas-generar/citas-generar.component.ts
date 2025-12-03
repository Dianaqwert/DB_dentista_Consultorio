import { Component, EventEmitter, Output,OnInit} from '@angular/core';
import { CitasService } from '../../services/citas.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PacientesService } from '../../services/pacientes.service';
import { EmpleadosService } from '../../services/empleados.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-citas-generar',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './citas-generar.component.html',
  styleUrl: './citas-generar.component.css'
})
export class CitasGenerarComponent implements OnInit {
  
  @Output() citaGuardada = new EventEmitter<void>();

  formCita: FormGroup;
  listaPacientes: any[] = [];
  listaDentistas: any[] = []; // Aquí cargaremos a los doctores
  mensajeError: string = '';

  // Variable simulada para el ID del recepcionista logueado
  // En una app real, esto lo sacas del AuthService o del Token
  idRecepcionistaLogueado = 1; 

  constructor(
    private fb: FormBuilder,
    private citaServive:CitasService,
    private pacientesService: PacientesService,
    private empleadosService: EmpleadosService
  ) {
    this.formCita = this.fb.group({
      id_paciente: ['', Validators.required],
      id_dentista: ['', Validators.required], // <--- Nuevo campo obligatorio
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

    // Intentar obtener ID real si existe en el servicio
    const usuario = this.empleadosService.getUsuario();
    if (usuario && usuario.id_usuario) {
        this.idRecepcionistaLogueado = usuario.id_usuario;
    }
  }

  ngOnInit(): void {
    this.cargarCatalogos();
  }

  cargarCatalogos() {
    // 1. Cargar Pacientes
    this.pacientesService.getPacientes().subscribe({
      next: (data) => this.listaPacientes = data,
      error: (e) => console.error('Error cargando pacientes', e)
    });

    // 2. Cargar Dentistas (Usando tu método filtrarPorTipo)
    this.empleadosService.filtrarPorTipo('Dentista').subscribe({
        next: (data) => this.listaDentistas = data,
        error: (e) => console.error('Error cargando dentistas', e)
    });
  }

  // Opcional: Validar disponibilidad antes de enviar (UX)
  verificarDisponibilidad() {
    const { fecha, hora, id_dentista } = this.formCita.value;
    this.mensajeError = ''; // Limpiar errores previos

    if (fecha && hora && id_dentista) {
      this.citaServive.consultarDisponibilidad(fecha, hora, id_dentista).subscribe({
        next: (res) => {
          if (!res.disponible) {
            this.mensajeError = '⚠️ El dentista ya está ocupado a esta hora.';
            this.formCita.controls['hora'].setErrors({ 'ocupado': true });
          } else {
             // Si está libre, nos aseguramos de quitar el error si lo tenía
             if (this.formCita.controls['hora'].hasError('ocupado')) {
                this.formCita.controls['hora'].setErrors(null);
             }
          }
        },
        error: (err) => console.error('Error verificando disponibilidad', err)
      });
    }
  }

  guardar() {
    if (this.formCita.invalid) {
        this.formCita.markAllAsTouched();
        return;
    }

    const datos = {
        ...this.formCita.value,
        id_recepcionista: this.idRecepcionistaLogueado
    };

    this.citaServive.crearCita(datos).subscribe({
      next: (res) => {
        alert('Cita agendada con éxito');
        this.formCita.reset();
        this.citaGuardada.emit(); // Regresamos a la agenda
      },
      error: (err) => {
        // Aquí mostraremos los mensajes de error del Backend (Trigger o Índice)
        alert('Error: ' + (err.error.error || 'No se pudo agendar'));
      }
    });
  }
}