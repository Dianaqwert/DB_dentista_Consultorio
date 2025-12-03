import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { materialStock } from '../interfaces/materialStock';

@Injectable({
    providedIn: 'root'
})
export class StockMaterialService {

    private apiUrl = 'http://localhost:3000/api/material-tratamiento';

    constructor(private http: HttpClient) { }

    getMateriales(): Observable<materialStock[]> {
        return this.http.get<materialStock[]>(this.apiUrl);
    }

    crearMaterial(material: materialStock): Observable<any> {
        return this.http.post<any>(this.apiUrl, material);
    }

    eliminarMaterial(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    buscarMateriales(term: string): Observable<materialStock[]> {
        const url = `${this.apiUrl}/buscar?term=${encodeURIComponent(term)}`;
        return this.http.get<materialStock[]>(url);
    }

    actualizarMaterial(material: materialStock): Observable<any> {
        const url = `${this.apiUrl}/${material.id_material}`;
        return this.http.put(url, material);
    }
}
