import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../interfaces/Cita';
import { CitaCobro } from '../interfaces/Cita';

@Injectable({
  providedIn: 'root'
})

export class CitasService {
  private apiUrl = 'http://localhost:3000/api/citasPagos'; // Ajusta tu puerto
  
  constructor(private http: HttpClient) {}
  // 1. Crear Cita
  crearCita(cita: any): Observable<any> {
    return this.http.post(this.apiUrl, cita);
  }

  getCitas(fecha?: string, estado?: string): Observable<Cita[]> {
    let params = new HttpParams();
    if (fecha) params = params.set('fecha', fecha);
    if (estado) params = params.set('estado', estado);
    
    return this.http.get<Cita[]>(this.apiUrl, { params });
  }

  // 3. Actualizar estado
  actualizarEstado(idCita: number, nuevoEstado: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${idCita}/estado`, { nuevo_estado: nuevoEstado });
  }

  // 4. Cobranza: Buscar pendientes
  // AHORA DEVUELVE CitaCobro[]
  buscarPendientesCobro(termino: string): Observable<CitaCobro[]> {
    return this.http.get<CitaCobro[]>(`${this.apiUrl}/cobranza/pendientes`, { 
        params: { termino } 
    });
  }

  // 5. Cobranza: Pagar
  realizarCobro(datosPago: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cobranza/pagar`, datosPago);
  }

  // 6. Catálogo Métodos Pago
  getMetodosPago(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cobranza/metodos`);
  }

  getCitasLISTA(fecha?: string, estado?: string): Observable<Cita[]> {
    let params = new HttpParams();

    if (fecha) {
      params = params.set('fecha', fecha); 
    }

    if (estado) {
      params = params.set('estado', estado);
    }

    // 🎯 CAMBIO CLAVE: Usamos la ruta /listar que mapea a getCitasFiltroLISTA
    return this.http.get<Cita[]>(`${this.apiUrl}/listar`, { params });
  }

   consultarDisponibilidad(fecha: string, hora: string, id_dentista: number): Observable<{ disponible: boolean, message: string }> {
    const params = new HttpParams()
      .set('fecha', fecha)
      .set('hora', hora)
      .set('id_dentista', id_dentista.toString());

    return this.http.get<{ disponible: boolean, message: string }>(`${this.apiUrl}/disponibilidad`, { params });
  }

   reprogramarCita(idCita: number, datos: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/${idCita}/reprogramar`, datos);
  }
}
