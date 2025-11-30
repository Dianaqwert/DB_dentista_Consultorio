import { Component } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { Usuario } from '../../interfaces/usuarioEmpleado';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BajarPersonalDComponent } from "../bajar-personal-d/bajar-personal-d.component";

@Component({
  standalone:true,
  selector: 'app-administrar-personal-d',
  imports: [FormsModule, ReactiveFormsModule,FormsModule, BajarPersonalDComponent],
  templateUrl: './administrar-personal-d.component.html',
  styleUrl: './administrar-personal-d.component.css'
})
export class AdministrarPersonalDComponent {

  maxlengthNombres="255";
  searchForm:FormGroup;

  maxlengthContraseña="8";
  soloLetras = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/;


  usuarioEmpleado = {
    nombreusUsuario: '',
    nombres: '',
    apellidopat: '',
    apellidomat: '',
    tipoEmpleado: 'Recepcion',
    contrasenaue: '',
    superadmin: false
  };


  constructor(private usuariosService: EmpleadosService, private fb: FormBuilder) {
    //Validadores agrupados en un array [] dentro del array del control
    this.searchForm = this.fb.group({
      nombreUser: ['', [Validators.required, Validators.maxLength(10)]], // Quitamos pattern solo letras aqui por si el usuario lleva numeros
      nombres: ['', [Validators.required, Validators.pattern(this.soloLetras), Validators.maxLength(255)]],
      apellidopat: ['', [Validators.required, Validators.pattern(this.soloLetras), Validators.maxLength(255)]],
      apellidomat: ['', [Validators.required, Validators.pattern(this.soloLetras), Validators.maxLength(255)]],
      tipoEmpleado: ['Recepcion', Validators.required],
      contrasenaue: ['', [Validators.required, Validators.maxLength(8)]],
      superadmin: [false] // Inicializar como booleano false, no string 'false'
    });
  }

  ngOnsearch() {
    this.registrarPersonal();
  }

  registrarPersonal() {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      alert("Por favor corrige los errores en el formulario");
      return;
    }

    // CORRECCIÓN 2: Mapeamos los datos del formulario al formato que espera el backend
    // Asumo que tu backend espera 'nombreusUsuario' en lugar de 'nombreUser'
    const datosParaBackend = {
      nombreUsuario: this.searchForm.value.nombreUser, // Frontend: nombreUser -> Backend: nombreUsuario
      nombres: this.searchForm.value.nombres,
      apellidoPat: this.searchForm.value.apellidopat,  // Frontend: apellidopat -> Backend: apellidoPat
      apellidoMat: this.searchForm.value.apellidomat,  // Frontend: apellidomat -> Backend: apellidoMat
      tipoEmpleado: this.searchForm.value.tipoEmpleado,
      contrasenaUE: this.searchForm.value.contrasenaue, // Frontend: contrasenaue -> Backend: contrasenaUE
      superAdmin: this.searchForm.value.superadmin
    };

    console.log("Enviando datos:", datosParaBackend);

    this.usuariosService.crearUsuarioEmpleado(datosParaBackend)
      .subscribe({
        next: (res) => {
          console.log("Empleado registrado:", res);
          // AVISO DE ÉXITO
          alert("¡Personal registrado con éxito!"); 
          this.resetReg(); // Limpiamos el formulario
        },
        error: (e) => {
          if (e.error && e.error.message) {
            alert("⚠️ " + e.error.message);
          } else {
            alert("Ocurrió un error inesperado en el servidor.");
          }
        }
      });
  }

  resetReg(){
    this.searchForm.reset({
      nombreUser:'',
      nombres: '',
      apellidopat:'',
      apellidomat:'',
      tipoEmpleado:'Recepcion',
      contrasenaue:'',
      superadmin: false
    })
  }

  
}
