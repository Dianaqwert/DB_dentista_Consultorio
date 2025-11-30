import { Component } from '@angular/core';
import { Usuario } from '../../interfaces/usuarioEmpleado';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadosService } from '../../services/empleados.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-menu-dentista',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './menu-dentista.component.html',
  styleUrl: './menu-dentista.component.css'
})
export class MenuDentistaComponent {
  usuarioEncontrado: Usuario | null = null;
  usuario!: Usuario;   // aseguramos que será inicializado
  esSuperAdmin: boolean = false;

  constructor(private router:Router) {
    const nav = history.state;
    console.log("Usuario recibido:", nav.usuario); 
    this.usuario = nav.usuario; 
    this.esSuperAdmin=this.usuario?.superadmin===true;
  }

  ngOnInit(): void {
    this.usuario = history.state['usuario'];
  }

  irAGestionPacientes() {
    this.router.navigate(['/gestion-pacientes'], { state: { usuario: this.usuario } });
  }

  irACitas() {
    this.router.navigate(['/tratamientos'], { state: { usuario: this.usuario } });
  }

  irAMateriales() {
    this.router.navigate(['/gestion-materiales'], { state: { usuario: this.usuario } });
  }

  irAAdministracion() {
    this.router.navigate(['/admin-personal'], { state: { usuario: this.usuario } });
  }



}
