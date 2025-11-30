import { Component } from '@angular/core';
import { AgendaCitasComponent } from "../agenda-citas/agenda-citas.component";
import { Usuario } from '../../interfaces/usuarioEmpleado';

@Component({
  selector: 'app-gestionar-pacientes-d',
  imports: [AgendaCitasComponent],
  templateUrl: './gestionar-pacientes-d.component.html',
  styleUrl: './gestionar-pacientes-d.component.css'
})
export class GestionarPacientesDComponent {
  //SE RECIBE AL USER:

  usuario!: Usuario;         // el que recibes desde router.state
  usuarioLogueado!: Usuario; // el que envías al componente agenda-citas

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

}
