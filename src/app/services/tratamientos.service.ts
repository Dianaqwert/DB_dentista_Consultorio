import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TratamientoNuevo } from '../interfaces/nuevoTratamiento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TratamientosService {

  private apiUrl = 'http://localhost:3000/api/tratamientos';
  
    constructor(private http: HttpClient) { }
  
    //metodos
    // 1. OBTENER LISTA (GET)
    getTratamientos(): Observable<TratamientoNuevo[]> {
      return this.http.get<TratamientoNuevo[]>(this.apiUrl);
    }
  
    // 2. CREAR (POST) -> Aquí mandamos el objeto del formulario
    crearTratamiento(tratamiento: TratamientoNuevo): Observable<TratamientoNuevo> {
      return this.http.post<TratamientoNuevo>(this.apiUrl, tratamiento);
    }
  
    // 3. ELIMINAR/BAJA (DELETE) -> Llama a tu procedimiento almacenado vía Node
    eliminarTratamiento(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }

    getTratamientosInactivos(): Observable<TratamientoNuevo[]> {
      return this.http.get<TratamientoNuevo[]>(`${this.apiUrl}/inactivos`);
    }

    // 1. OBTENER REPORTE PACIENTES
    getPacientesConTratamientosInactivos(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/reporte-pacientes-inactivos`);
    }

    // 2. AJUSTAR PRECIO
    ajustarPrecio(id: number, porcentaje: number): Observable<any> {
      return this.http.put(`${this.apiUrl}/ajustar-precio/${id}`, { porcentaje });
    }

    getPromedio(): Observable<{ promedio: number }> {
      return this.http.get<{ promedio: number }>(`${this.apiUrl}/promedio`);
    }


  
    
}
