import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BusquedapacientesRComponent } from '../busquedapacientes-r/busquedapacientes-r.component';
import { AltaPacienteRComponent } from '../alta-paciente-r/alta-paciente-r.component';

@Component({
  standalone:true,
  selector: 'app-pacientes-main-component',
  imports: [CommonModule,BusquedapacientesRComponent,AltaPacienteRComponent],
  templateUrl: './pacientes-main-component.component.html',
  styleUrl: './pacientes-main-component.component.css'
})

export class PacientesMainComponentComponent {
  // Variable de estado para controlar qué se ve
  vistaActual: 'buscar' | 'alta' = 'buscar';

  cambiarVista(nuevaVista: 'buscar' | 'alta') {
    this.vistaActual = nuevaVista;
  }

}
