import { HttpClient,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../interfaces/Paciente';
import { NuevaDireccion } from '../interfaces/DireccionPaciente';


@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  API_PACIENTES_URL="http://localhost:3000/api/pacientes";
  API_PACIENTES_REP_URL="http://localhost:3000/api/pacientesRep"

  constructor(private http:HttpClient) { }
  //paciente
  getPacientes():Observable<any>{
    return this.http.get(this.API_PACIENTES_URL)
  }


  //PARA BUSCAR EN LA TABLA -> FORMULARIO
  buscarPacientes(nombres: string, apellidoPat: string, apellidoMat: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.API_PACIENTES_URL}/buscar`, {
            params: { nombre: nombres, apellidoPat: apellidoPat, apellidoMat: apellidoMat }
        });
  }

  //-------------------PARA LAS VISTAS
  getReporteCompleto(idPaciente: number): Observable<any[]> {
    // Retorna un array de filas de la vista vista_reporte_cita_completa
    return this.http.get<any[]>(`${this.API_PACIENTES_URL}/${idPaciente}/reporte-completo`);
  }
  
  getDerivaciones(idPaciente: number | null): Observable<any[]> {
    const idParaEnviar = idPaciente ? idPaciente : 0;
    return this.http.get<any[]>(`${this.API_PACIENTES_URL}/${idParaEnviar}/derivaciones-externas`);
  }

  getHistorial(idPaciente:number|null):Observable<any[]>{
    const idParaEnviar = idPaciente ? idPaciente : 0;
    return this.http.get<any[]>(`${this.API_PACIENTES_URL}/${idParaEnviar}/historial-paciente`);
  }
  
  getTratamientos(idPaciente:number|null):Observable<any[]>{
    const idParaEnviar=idPaciente ? idPaciente:0;
    return this.http.get<any[]>(`${this.API_PACIENTES_URL}/${idParaEnviar}/tratamiento-paciente`);
  }

  //---------para las altas , update y bajas----------------------------------------------------------------------
  // 1. Obtener Catálogos (Simples SELECTs)
  getListaTratamientos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_PACIENTES_URL}/catalogos/tratamientos`);
  }

  getListaMateriales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_PACIENTES_URL}/catalogos/materiales`);
  }

  // 2. LA TRANSACCIÓN MAESTRA
  registrarAtencionCompleta(datos: any): Observable<any> {
    // datos contiene: { id_cita, historial, tratamientos[], derivaciones[], estudios[] ... }
    return this.http.post(`${this.API_PACIENTES_URL}/atencion-cita`, datos);
  }

  // Obtener solo citas pendientes/agendadas
  getCitasAgendadas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_PACIENTES_URL}/citas/agendadas`);
  }

  getCitasPorFecha(fecha: string, estado: string, idDentista?: number): Observable<any[]> {
    let params = new HttpParams().set('fecha', fecha);
    
    if (estado && estado !== 'Todos') {
      params = params.set('estado', estado);
    }

    // Si recibimos el ID del dentista, lo enviamos
    if (idDentista) {
      params = params.set('idDentista', idDentista.toString());
    }

    return this.http.get<any[]>(`${this.API_PACIENTES_URL}/citas/filtro`, { params });
  }

  // Obtener datos para editar una cita
  getDetalleCita(idCita: number): Observable<any> {
    return this.http.get<any>(`${this.API_PACIENTES_URL}/cita/${idCita}/detalles`);
  }

  getUltimoHistorial(idPaciente: number): Observable<any> {
    return this.http.get<any>(`${this.API_PACIENTES_URL}/paciente/${idPaciente}/ultimo-historial`);
  }

  //______________________PARA ALTAS Y BAJAS DE PACIENTES____________________
   // MÉTODO PARA CREAR PACIENTE
  // MÉTODO PARA CREAR PACIENTE (Se queda igual, apunta a la raiz)
  crearPaciente(paciente: any): Observable<any> {
    return this.http.post<any>(this.API_PACIENTES_REP_URL, paciente);
  }
  
  // MÉTODO PARA CREAR DIRECCIÓN (CORREGIDO)
  crearDireccion(direccion: NuevaDireccion): Observable<NuevaDireccion> {
    // Agregamos '/direccion' a la URL base
    return this.http.post<NuevaDireccion>(`${this.API_PACIENTES_REP_URL}/direccion`, direccion);
  }

  // 2. BUSCAR (GET) - Para GestionPacientesComponent
  // 3. EDITAR/ACTUALIZAR (PUT) - Para GestionPacientesComponent
  // Llama a: /api/pacientes/15
  actualizarPaciente(id: number, paciente: any): Observable<any> {
    return this.http.put<any>(`${this.API_PACIENTES_REP_URL}/${id}`, paciente);
  }


  buscarPacientes2(terminoGeneral: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_PACIENTES_REP_URL}/buscar`, {
        params: { 
            // Enviamos todo el texto en el campo 'nombre'.
            // Tu backend concatenará: "Juan Perez" + "" + "" = "Juan Perez"
            nombre: terminoGeneral, 
            apellidoPat: '', 
            apellidoMat: '' 
        }
    });
}

}
