import { HttpClient,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './interfaces/usuarioEmpleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  usuarioLogeado:any=null;
  private API_URL="http://localhost:3000/api/empleados";
  API_PACIENTES_URL="http://localhost:3000/api/pacientes"

  constructor(private http: HttpClient) { 
    // AL INICIAR EL SERVICIO, BUSCAR EN LOCALSTORAGE
    const usuarioGuardado = localStorage.getItem('usuario_dental');
    if (usuarioGuardado) {
      this.usuarioLogeado = JSON.parse(usuarioGuardado);
    }
  }

  getEmpleados(): Observable<any> {
   // API_URL es "http://localhost:3000/api/empleados"
   return this.http.get(this.API_URL)
  }

  //funcion para buscar empleados por campo
  buscarEmpleado(nombreUser:string,contrasena:string){
    const body={
      nombre:nombreUser,
      contrasena:contrasena
    };

    //solicitud post
    return this.http.post<Usuario>(`${this.API_URL}/buscar`,body);
  }

  getListarEmpleados(){
    return this.http.get<Usuario>(`${this.API_URL}/listar`);
  }




}
