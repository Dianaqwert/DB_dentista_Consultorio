import { Component } from '@angular/core';
import { AgendaCitasComponent } from "../agenda-citas/agenda-citas.component";
import { Usuario } from '../../interfaces/usuarioEmpleado';
import { ReporteClinicoComponent } from "../reporte-clinico/reporte-clinico.component";
import { PacienteReporte } from '../../interfaces/PacienteReporte';
import { CommonModule } from '@angular/common';
import { TratamientosDComponent } from "../tratamientos-d/tratamientos-d.component";

@Component({
  standalone:true,
  selector: 'app-gestionar-pacientes-d',
  imports: [AgendaCitasComponent, ReporteClinicoComponent, CommonModule, TratamientosDComponent],
  templateUrl: './gestionar-pacientes-d.component.html',
  styleUrl: './gestionar-pacientes-d.component.css'
})
export class GestionarPacientesDComponent {

  usuario!: Usuario;         // el que recibes desde router.state
  usuarioLogueado!: Usuario; // el que envías al componente agenda-citas
  pacientes: PacienteReporte[] = [];
  pacienteSeleccionado: PacienteReporte | null = null;



  constructor() {
    const nav = history.state;
    this.usuario = nav.usuario;
    this.usuarioLogueado = this.usuario; // si ambos son el mismo
  }

  abrirModalAtencion(cita: any) {
    console.log("Cita recibida:", cita);
  }

  ngOnInit() {
    this.usuario = history.state['usuario'];
    console.log("Usuario recibido:", this.usuario);
  }

  seleccionarPaciente(paciente: PacienteReporte) {
    console.log("Paciente seleccionado:", paciente);
    this.pacienteSeleccionado = paciente;  // <-- AQUÍ ESTABA EL ERROR
  }



}
