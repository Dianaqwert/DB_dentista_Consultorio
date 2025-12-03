import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,AbstractControl,ValidationErrors,ValidatorFn } from '@angular/forms';
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from '../../interfaces/Paciente';
import { DireccionpacientesRComponent } from "../direccionpacientes-r/direccionpacientes-r.component";

export function noRepetitiveCharacters(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  if (!value) return null;
  // Detecta 3 o más caracteres idénticos consecutivos
  const hasRepetition = /(.)\1{2,}/.test(value);
  return hasRepetition ? { repetitive: true } : null;
}

export const namesNotEqualValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  // Obtenemos los valores directos del grupo
  const nombre = control.get('nombresPaciente')?.value;
  const pat = control.get('apellidoPat')?.value;
  const mat = control.get('apellidoMat')?.value;

  if (!nombre || !pat || !mat) return null;

  const n = nombre.trim().toLowerCase();
  const p = pat.trim().toLowerCase();
  const m = mat.trim().toLowerCase();

  // REGLA 1: El Nombre no puede ser igual al Paterno
  if (n === p) return { nameEqualsPat: true };
  
  // REGLA 2: El Nombre no puede ser igual al Materno
  if (n === m) return { nameEqualsMat: true };

  // REGLA 3 (Opcional): Bloquear si los 3 son idénticos (ya cubierto por las anteriores)
  if (n === p && p === m) return { allEqual: true };

  return null;
};

@Component({
  standalone:true,
  selector: 'app-alta-paciente-r',
  imports: [CommonModule, ReactiveFormsModule, DireccionpacientesRComponent],
  templateUrl: './alta-paciente-r.component.html',
  styleUrl: './alta-paciente-r.component.css'
})
export class AltaPacienteRComponent {
  soloLetras = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
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
      nombresPaciente: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern(this.soloLetras), noRepetitiveCharacters]],
      apellidoPat: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern(this.soloLetras), noRepetitiveCharacters]],
      apellidoMat: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern(this.soloLetras), noRepetitiveCharacters]],
      telefono: ['', [Validators.required, Validators.pattern(this.soloNumeros), Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(255), Validators.pattern(this.emailPattern), noRepetitiveCharacters]]
    }, { 
      validators: namesNotEqualValidator 
    });
  }

  guardar() {
    if (this.pacienteForm.invalid) {
      this.pacienteForm.markAllAsTouched(); // Marca todos los campos para mostrar errores rojos
      // Si hay error de nombres iguales, mostramos alerta
      if (this.pacienteForm.errors?.['nameEqualsPat'] || this.pacienteForm.errors?.['nameEqualsMat']) {
        alert("⚠️ Error: El nombre no puede ser igual a los apellidos.");
      }
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
