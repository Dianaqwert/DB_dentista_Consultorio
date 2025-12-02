import { Component } from '@angular/core';
import { Usuario } from '../../interfaces/usuarioEmpleado';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { EmpleadosService } from '../../services/empleados.service';


@Component({
  selector: 'app-menu-recepcionista',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './menu-recepcionista.component.html',
  styleUrl: './menu-recepcionista.component.css'
})
export class MenuRecepcionistaComponent {

  usuarioEncontrado: Usuario | null = null;
  usuario!: Usuario;   // aseguramos que será inicializado

  constructor(private router:Router,
    private empleadosService:EmpleadosService
  ){}

  ngOnInit():void{
    this.usuario = this.empleadosService.getUsuario() || history.state['usuario'];
    console.log("Usuario final en ngOnInit:", this.usuario);
  }

  irAltaPaciente(){
    this.router.navigate(['/alta-pacientes'], { state: { usuario: this.usuario } });
  }

  irACitasPaciente(){
    this.router.navigate(['/citas-pacientes'], { state: { usuario: this.usuario } });
  }

  irCobrosEIngresos(){
    this.router.navigate(['/cobros-ingresos'], { state: { usuario: this.usuario } });
  }
  
  
}
