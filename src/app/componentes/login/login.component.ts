import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmpleadosService } from '../../services/empleados.service';
import { Router } from '@angular/router';


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

  //1-buscar usuario
  buscarUE() {
    // Resetear mensajes
    this.usuarioEncontrado = null;
    this.msjError = '';
    this.msjExito = '';

    this.empleadosService.buscarEmpleado(this.empleadoBuscado, this.contraEB)
      .subscribe({
        next: (empleado) => {

          // Si llega aquí, el backend ya encontró al usuario
          this.usuarioEncontrado = empleado;
          this.msjExito = 'Inicio de sesión exitoso.';

          const rol = empleado.tipoempleado?.toLowerCase();

          // Redirección según el rol
          switch (rol) {
            case 'dentista':
              this.router.navigate(['/menu-dentista']);
              break;

            case 'ayudante':
              this.router.navigate(['/menu-ayudante']);
              break;

            case 'recepcionista':
              this.router.navigate(['/menu-recepcionista']);
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
