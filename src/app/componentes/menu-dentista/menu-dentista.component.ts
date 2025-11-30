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

  constructor(private router:Router,private empleadoService:EmpleadosService) {
    const nav = history.state;
    console.log("Usuario recibido:", nav.usuario); 
    this.usuario = nav.usuario; 
  }

  ngOnInit(): void {
  // Intentamos obtener del servicio (persistencia), si es null, usamos lo que viene de la navegación
  this.usuario = this.empleadoService.getUsuario() || history.state['usuario'];

  console.log("Usuario final en ngOnInit:", this.usuario);

  if (this.usuario) {
    // IMPORTANTE: Verifica cómo viene escrito el campo en el console log
    // A veces la base de datos devuelve 'superadmin' (minúsculas) y tu código busca 'superAdmin'
    // Con esta línea cubres ambas opciones:
    const esAdmin = this.usuario.superadmin || this.usuario.superadmin;
    
    // Convertimos a booleano real (por si viene como 1 o 'true')
    this.esSuperAdmin = (esAdmin === true);
  } else {
    this.esSuperAdmin = false;
  }

  console.log("¿Es Super Admin?:", this.esSuperAdmin);
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
