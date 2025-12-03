import { Component } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { Usuario } from '../../interfaces/usuarioEmpleado';
import { AbstractControl, FormBuilder, FormControl,ValidatorFn, FormGroup, FormsModule, ReactiveFormsModule, Validators ,ValidationErrors} from '@angular/forms';
import { BajarPersonalDComponent } from "../bajar-personal-d/bajar-personal-d.component";

export function noRepetitiveCharacters(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  if (!value) return null;
  
  // Regex: Busca cualquier caracter (.) capturado en el grupo 1, 
  // seguido por el mismo caracter (\1) dos o más veces ({2,}).
  const hasRepetition = /(.)\1{2,}/.test(value);
  
  return hasRepetition ? { repetitive: true } : null;
}

export const namesNotEqualValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  
  // Antes buscabas 'nombresPaciente', pero en este form se llama 'nombres'
  const nombre = control.get('nombres')?.value;
  
  // Antes buscabas 'apellidoPat', pero en este form se llama 'apellidopat' (minúsculas)
  const pat = control.get('apellidopat')?.value;
  
  // Antes buscabas 'apellidoMat', pero en este form se llama 'apellidomat' (minúsculas)
  const mat = control.get('apellidomat')?.value;

  // Si falta alguno, no validamos aún
  if (!nombre || !pat || !mat) return null;

  const n = nombre.trim().toLowerCase();
  const p = pat.trim().toLowerCase();
  const m = mat.trim().toLowerCase();

  // REGLA 1: El Nombre no puede ser igual al Paterno
  if (n === p) return { nameEqualsPat: true };
  
  // REGLA 2: El Nombre no puede ser igual al Materno
  if (n === m) return { nameEqualsMat: true };

  return null;
};


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


   constructor(
    private fb: FormBuilder,
    private usuariosService: EmpleadosService
  ) {
    this.searchForm = this.fb.group({
      // 1. Nombre de Usuario
      nombreUser: ['', [
        Validators.required, 
        Validators.maxLength(10)
      ]],

      // 2. Nombres (Agregamos noRepetitiveCharacters)
      nombres: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(this.soloLetras), 
        Validators.maxLength(255),
        noRepetitiveCharacters // <--- NUEVA VALIDACIÓN
      ]],

      // 3. Apellido Paterno (Agregamos noRepetitiveCharacters)
      apellidopat: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(this.soloLetras),
        Validators.maxLength(255),
        noRepetitiveCharacters // <--- NUEVA VALIDACIÓN
      ]],

      // 4. Apellido Materno (Agregamos noRepetitiveCharacters)
      apellidomat: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(this.soloLetras),
        Validators.maxLength(255),
        noRepetitiveCharacters, // <--- NUEVA VALIDACIÓN
      ]],

      // 5. Tipo de Empleado (Asegurado aquí para corregir tu error)
      tipoEmpleado: ['Recepcion', Validators.required],

      // 6. Contraseña
      contrasenaue: ['', [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(8),
      ]],

      // 7. Super Admin
      superadmin: [false]
    }, { 
          validators: namesNotEqualValidator 
        });
  }

  ngOnsearch() {
    this.registrarPersonal();
  }

  registrarPersonal() {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      if (this.searchForm.errors?.['nameEqualsPat'] || this.searchForm.errors?.['nameEqualsMat']) {
        alert("⚠️ Error: El nombre no puede ser igual a los apellidos.");
      }
      
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
