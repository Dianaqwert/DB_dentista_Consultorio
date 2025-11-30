import { Component } from '@angular/core';
import { Usuario } from '../../services/interfaces/usuarioEmpleado';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-menu-dentista',
  imports: [CommonModule,FormsModule],
  templateUrl: './menu-dentista.component.html',
  styleUrl: './menu-dentista.component.css'
})
export class MenuDentistaComponent {
  usuarioEncontrado: Usuario | null = null;
  usuario!: Usuario;   // aseguramos que será inicializado
  esSuperAdmin: boolean = false;

  constructor() {
    const nav = history.state;
    console.log("Usuario recibido:", nav.usuario); 
    this.usuario = nav.usuario; 
    this.esSuperAdmin=this.usuario?.superadmin===true;
  }


}
