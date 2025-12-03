import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from '../../interfaces/Paciente';

@Component({
  selector: 'app-busquedapacientes-r',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './busquedapacientes-r.component.html',
  styleUrl: './busquedapacientes-r.component.css'
})

export class BusquedapacientesRComponent {

  // Variables para búsqueda
  terminoBusqueda: string = '';
  resultados: Paciente[] = [];
  busquedaRealizada: boolean = false;

  // Variables para edición
  pacienteEnEdicion: Paciente | null = null;
  formEdicion: FormGroup;

  soloLetras = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/;
  soloNumeros = /^[0-9]+$/;

  @Output() nuevoPacienteClick = new EventEmitter<void>();

  constructor(
    private pacienteService: PacientesService,
    private fb: FormBuilder
  ) {
    // Inicializamos el formulario de edición (igual que el de alta)
    this.formEdicion = this.fb.group({
      nombresPaciente: [
        '',
        [
          Validators.minLength(3),           
          Validators.required,                 
          Validators.pattern(this.soloLetras), // solo letras y espacios
          Validators.maxLength(100)            // máximo 100 caracteres
        ]
      ],
      // CORRECCIÓN: Usar CamelCase (apellidoPat)
      apellidoPat: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.soloLetras), Validators.maxLength(100)]],
      
      // CORRECCIÓN: Usar CamelCase (apellidoMat)
      apellidoMat: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.soloLetras), Validators.maxLength(100)]],
      telefono: [
        '',
        [
          Validators.required,              
          Validators.pattern(this.soloNumeros), // solo números
          Validators.minLength(10), 
          Validators.maxLength(10)
        ]
      ],
      email: [
        '',
        [
          Validators.minLength(10),
          Validators.required,
          Validators.email,                     // valida formato de correo
          Validators.maxLength(255)             // máximo 255 caracteres
        ]
      ]
    });
  }

  ngOnInit() {
    this.cargarTodosLosPacientes();
  }

  cargarTodosLosPacientes() {
    this.pacienteService.getPacientes().subscribe({
      next: (data) => {
        this.resultados = data;
      },
      error: (e) => console.error('Error cargando lista:', e)
    });
  }


buscar() {
    // Si la caja de texto está vacía, volvemos a cargar TODOS
    if (!this.terminoBusqueda.trim()) {
      this.cargarTodosLosPacientes();
      return;
    }

    // Si hay texto, usamos tu buscador filtrado
    this.pacienteService.buscarPacientes2(this.terminoBusqueda).subscribe({
      next: (data) => {
        this.resultados = data;
        this.pacienteEnEdicion = null;
      },
      error: (e) => console.error(e)
    });
  }

  
  iniciarEdicion(paciente: Paciente) {
    this.pacienteEnEdicion = paciente;
    // Llenamos el formulario con los datos actuales
    this.formEdicion.patchValue({
      nombresPaciente: paciente.nombrespaciente, // Ojo con mayúsculas/minúsculas de tu interfaz
      apellidoPat: paciente.apellidopat,
      apellidoMat: paciente.apellidomat,
      telefono: paciente.telefono,
      email: paciente.email
    });
  }

  cancelarEdicion() {
    this.pacienteEnEdicion = null;
    this.formEdicion.reset();
  }

  guardarCambios() {
    if (this.formEdicion.invalid || !this.pacienteEnEdicion) {
        this.formEdicion.markAllAsTouched();
        return;
    }

    const datosActualizados = this.formEdicion.value;
    const id = this.pacienteEnEdicion.id_paciente;

    this.pacienteService.actualizarPaciente(id, datosActualizados).subscribe({
      next: () => {
        alert('Datos actualizados correctamente');
        this.pacienteEnEdicion = null;
        this.buscar(); // Refrescamos la tabla
      },
      error: (err) => alert(err.error.error || 'Error al actualizar')
    });
  }

  irANuevoPaciente() {
    this.nuevoPacienteClick.emit();
  }
}
