import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaAgrupada } from '../interfaces/inventarioGen';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  
  private apiUrl = 'http://localhost:3000/api/inventario';

  constructor(private http:HttpClient) { }

  // 1. Llama a fn_reporte_bajo_stock(x)
  getBajoStock(limite: number): Observable<any[]> {
    // Configuramos los parámetros URL (?limite=x)
    let params = new HttpParams().set('limite', limite);
    return this.http.get<any[]>(`${this.apiUrl}/bajo-stock`, { params });
  }

  // 2. Llama a fn_categorias_alto_valor(x)
  getAltoValor(monto: number): Observable<CategoriaAgrupada[]> {
    let params = new HttpParams().set('monto', monto);
    return this.http.get<CategoriaAgrupada[]>(`${this.apiUrl}/alto-valor`, { params });
  }

  // 3. Llama a la vista general
  getInventarioGeneral(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/general`);
  }

}
