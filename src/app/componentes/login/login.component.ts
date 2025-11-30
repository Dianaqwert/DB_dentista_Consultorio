import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmpleadosService } from '../../services/empleados.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuarioEmpleado';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //variables
  empleadoBuscado:string='';
  contraEB:string='';
  empleados: any[] = [];
  usuarioEncontrado:any=null;
  msjError:string='';
  msjExito:string=''

  constructor(private empleadosService: EmpleadosService,
    private router:Router) 
  {}

  buscarUE() {
  // Resetear mensajes
  this.usuarioEncontrado = null;
  this.msjError = '';
  this.msjExito = '';

  this.empleadosService.buscarEmpleado(this.empleadoBuscado, this.contraEB)
    .subscribe({
      next: (data: Usuario) => {
        
        console.log("Usuario recibido:", data);

        this.usuarioEncontrado = data;
        this.msjExito = 'Inicio de sesión exitoso.';

        const rol = data.tipoempleado?.toLowerCase();

        switch (rol) {
          case 'dentista':
            this.router.navigate(['/menu-dentista'], { state: { usuario: data } });
            break;

          case 'ayudante':
            this.router.navigate(['/menu-ayudante'], { state: { usuario: data } });
            break;

          case 'recepcionista':
            this.router.navigate(['/menu-recepcionista'], { state: { usuario: data } });
            break;

          default:
            this.msjError = 'El tipo de empleado no está configurado.';
            break;
        }
      },

      error: (err) => {
        console.error(err);

        if (err.status === 404) {
          this.msjError = 'Usuario o contraseña incorrectos.';
        } else {
          this.msjError = 'Error al conectar con el servidor.';
        }
      }
    });
}


}
