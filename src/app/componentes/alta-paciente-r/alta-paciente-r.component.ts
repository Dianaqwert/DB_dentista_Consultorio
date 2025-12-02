import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from '../../interfaces/Paciente';

@Component({
  standalone:true,
  selector: 'app-alta-paciente-r',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './alta-paciente-r.component.html',
  styleUrl: './alta-paciente-r.component.css'
})
export class AltaPacienteRComponent {
  soloLetras = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/;
  soloNumeros = /^[0-9]+$/;
  searchForm:FormGroup;
  listaPacientes :Paciente[]=[];

  constructor(
  private pacienteservice: PacientesService,
  private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      nombresPaciente: [
        '',
        [
          Validators.required,                 
          Validators.pattern(this.soloLetras), // solo letras y espacios
          Validators.maxLength(100)            // máximo 100 caracteres
        ]
      ],
      apellidopat: [
        '',
        [
          Validators.required,                 
          Validators.pattern(this.soloLetras), 
          Validators.maxLength(100)            
        ]
      ],
      apellidomat: [
        '',
        [
          Validators.required,                 
          Validators.pattern(this.soloLetras), 
          Validators.maxLength(100)            
        ]
      ],
      telefono: [
        '',
        [
          Validators.required,              
          Validators.pattern(this.soloNumeros), // solo números
          Validators.maxLength(20)              // máximo 20 caracteres
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,                     // valida formato de correo
          Validators.maxLength(255)             // máximo 255 caracteres
        ]
      ]
    });
  }

  ngOnInit():void{
    this.cargarDatos()
  }

  cargarDatos(){
  }

}
