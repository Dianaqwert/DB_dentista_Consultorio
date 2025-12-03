import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,AbstractControl,ValidationErrors} from '@angular/forms';
import { PacientesService } from '../../services/pacientes.service';


export function noRepetitiveCharacters(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  if (!value) return null;
  // Detecta si un caracter se repite 3 o más veces seguidas
  const hasRepetition = /(.)\1{2,}/.test(value);
  return hasRepetition ? { repetitive: true } : null;
}

@Component({
  standalone:true,
  selector: 'app-direccionpacientes-r',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './direccionpacientes-r.component.html',
  styleUrl: './direccionpacientes-r.component.css'
})
export class DireccionpacientesRComponent {
  @Input() idPaciente!: number; // Recibimos el ID del paciente recién creado
  @Output() finalizar = new EventEmitter<void>(); // Evento para avisar al padre
  
  direccionForm: FormGroup;

  // Patrones
  soloNumeros = /^[0-9]+$/; // Solo dígitos

  constructor(private fb: FormBuilder, private direccionesService: PacientesService) {
    this.direccionForm = this.fb.group({
      // CP: 5 dígitos exactos
      cp: ['', [Validators.required,Validators.pattern(/^[0-9]{5}$/)]],
      
      // Calle: Max 80, Min 3, No repeticiones
      calle: ['', [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(80), 
        noRepetitiveCharacters
      ]],
      
      // Colonia: Max 60, Min 3, No repeticiones
      colonia: ['', [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(60), 
        noRepetitiveCharacters
      ]],
      
      // Municipio: Max 50, No repeticiones
      municipio: ['Aguascalientes', [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(50), 
        noRepetitiveCharacters
      ]],
      
      // Num Ext: Max 5 números
      numeroExt: ['', [
        Validators.required,
        Validators.pattern(this.soloNumeros), 
        Validators.maxLength(5)
      ]],
      
      // Num Int: Max 10 caracteres, No repeticiones (ej: evitar "BBBB")
      numeroInt: ['', [
        Validators.maxLength(5), 
        noRepetitiveCharacters
      ]] 
    });
  }


  guardarDireccion() {
    if (this.direccionForm.invalid) return;

    const datos = {
      ...this.direccionForm.value,
      id_paciente: this.idPaciente // Agregamos el ID extranjero
    };

    this.direccionesService.crearDireccion(datos).subscribe({
      next: () => {
        alert('Dirección agregada correctamente');
        this.direccionForm.reset();
      },
      error: (err) => alert(err.error.error || 'Error al guardar')
    });
  }
}
