import { Component } from '@angular/core';
import { Usuario } from '../../interfaces/usuarioEmpleado';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  standalone:true,
  selector: 'app-menu-ayudante',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './menu-ayudante.component.html',
  styleUrl: './menu-ayudante.component.css'
})
export class MenuAyudanteComponent {
   usuarioEncontrado: Usuario | null = null;
  usuario!: Usuario;   // aseguramos que será inicializado

  constructor(private router:Router,
    private empleadosService:EmpleadosService
  ){}

  ngOnInit():void{
    this.usuario = this.empleadosService.getUsuario() || history.state['usuario'];
    console.log("Usuario final en ngOnInit:", this.usuario);
  }

  irAinventario(){
    this.router.navigate(['/inventario-ayudante'], { state: { usuario: this.usuario } });
  }

}
