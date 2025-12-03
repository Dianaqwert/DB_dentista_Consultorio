import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ Importamos la interfaz TipoMaterial que creaste
import { TipoMaterial } from '../interfaces/tipoMaterial';

@Injectable({
  providedIn: 'root'
})
export class TipoMaterialService {

  // URL base del endpoint de Node.js: http://localhost:3000/api/tipo-material
  private apiUrl = 'http://localhost:3000/api/tipo-material';

  constructor(private http: HttpClient) { }

  /**
   * 1. CONSULTA (READ - GET)
   * Obtiene la lista completa de Tipos de Material.
   * Endpoint: GET /api/tipo-material
   */
  getTiposMateriales(): Observable<TipoMaterial[]> {
    // Especificamos que esperamos un array de TipoMaterial
    return this.http.get<TipoMaterial[]>(this.apiUrl);
  }

  /**
   * 2. ALTA (CREATE - POST)
   * Crea una nueva categoría de material.
   * Endpoint: POST /api/tipo-material
   * @param nombre El nombre de la nueva categoría (ej. "Insumos").
   */
  crearTipoMaterial(nombre: string): Observable<TipoMaterial> {
    // El backend espera un objeto { nombre_tipo: "..." } en el cuerpo de la petición
    const payload = { nombre_tipo: nombre };
    // Especificamos que esperamos un objeto TipoMaterial de respuesta
    return this.http.post<TipoMaterial>(this.apiUrl, payload);
  }

  /**
   * 3. BAJA (DELETE)
   * Elimina una categoría por su ID.
   * Endpoint: DELETE /api/tipo-material/:id
   * @param id El ID del tipo de material a eliminar.
   */
  eliminarTipoMaterial(id: number): Observable<any> {
    // La respuesta del backend será un mensaje (por eso usamos 'any')
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // ----------------------------------------------------

  /**
   * 4. BÚSQUEDA (READ - GET)
   * Busca Tipos de Material por ID o por nombre.
   * Endpoint: GET /api/tipo-material/buscar?term=valor
   * @param term El ID o parte del nombre a buscar.
   */
  buscarTiposMateriales(term: string | number): Observable<TipoMaterial[]> {
    // Apunta al endpoint '/buscar' y pasa el término como query parameter
    const url = `${this.apiUrl}/buscar?term=${encodeURIComponent(term)}`;
    // El backend devuelve un array de TipoMaterial
    return this.http.get<TipoMaterial[]>(url);
  }
}
