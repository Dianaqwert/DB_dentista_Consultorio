import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from '../../interfaces/Paciente';
import { DireccionpacientesRComponent } from "../direccionpacientes-r/direccionpacientes-r.component";

@Component({
  standalone:true,
  selector: 'app-alta-paciente-r',
  imports: [CommonModule, ReactiveFormsModule, DireccionpacientesRComponent],
  templateUrl: './alta-paciente-r.component.html',
  styleUrl: './alta-paciente-r.component.css'
})
export class AltaPacienteRComponent {
  soloLetras = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/;
  soloNumeros = /^[0-9]+$/;
  pacienteForm:FormGroup;
  listaPacientes :Paciente[]=[];
  idPacienteRecienCreado: number | null = null;
  @Output() cancelarOFinalizar = new EventEmitter<void>(); // <--- Evento para volver

  constructor(
  private pacienteservice: PacientesService,
  private fb: FormBuilder
  ) {
    this.pacienteForm = this.fb.group({
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

  guardar() {
    if (this.pacienteForm.invalid) {
      this.pacienteForm.markAllAsTouched(); // Marca todos los campos para mostrar errores rojos
      return;
    }

    const nuevoPaciente: Paciente = this.pacienteForm.value;

    this.pacienteservice.crearPaciente(nuevoPaciente).subscribe({
      next: (res) => {
        alert('¡Paciente registrado con éxito!');
        this.pacienteForm.reset(); // Limpia el formulario
        this.idPacienteRecienCreado = res.paciente.id_paciente;
      },
      error: (err) => {
        console.error(err);
        // Manejo de errores específicos del backend
        if (err.error && err.error.error) {
          alert('Error: ' + err.error.error); // Ej: "Correo duplicado"
        } else {
          alert('Ocurrió un error al registrar el paciente.');
        }
      }
    });
  }
  
  procesoTerminado() {
    this.idPacienteRecienCreado = null;
    this.pacienteForm.reset();
    alert('Proceso completo: Paciente y Dirección registrados.');
    this.cancelarOFinalizar.emit();
  }

  cancelar() {
    this.cancelarOFinalizar.emit();
  }

}
