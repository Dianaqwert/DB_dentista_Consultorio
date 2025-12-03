import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesServiceService {

   private apiUrl = 'http://localhost:3000/api/citasPagos/reportes';

  constructor(private http: HttpClient) {}

  getIngresos(fechaInicio: string, fechaFin: string): Observable<any[]> {
    const params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);
    return this.http.get<any[]>(`${this.apiUrl}/ingresos`, { params });
  }

  getDeudores(fechaInicio: string, fechaFin: string): Observable<any[]> {
    const params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);
    return this.http.get<any[]>(`${this.apiUrl}/deudores`, { params });
  }
}
