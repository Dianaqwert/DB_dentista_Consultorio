import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PacientesService } from '../../services/pacientes.service';

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

  constructor(private fb: FormBuilder, private direccionesService: PacientesService) {
    this.direccionForm = this.fb.group({
      cp: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      calle: ['', Validators.required],
      colonia: ['', Validators.required],
      municipio: ['Aguascalientes', Validators.required],
      numeroExt: ['', Validators.required],
      numeroInt: [''] // Opcional
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
