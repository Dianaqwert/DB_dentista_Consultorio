import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private usuarioKey = 'usuario_sesion';

  constructor() { }

  // 1. Guardar usuario al hacer Login
  login(usuario: any) {
    localStorage.setItem(this.usuarioKey, JSON.stringify(usuario));
  }

  // 2. Cerrar sesión
  logout() {
    localStorage.removeItem(this.usuarioKey);
  }

  // 3. Obtener el usuario logueado actualmente
  getUsuario(): any | null {
    const userStr = localStorage.getItem(this.usuarioKey);
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  // 4. Verificar si está logueado
  estaLogueado(): boolean {
    return !!localStorage.getItem(this.usuarioKey);
  }
}