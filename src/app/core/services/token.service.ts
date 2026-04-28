import { Injectable } from '@angular/core';

/**
 * Clave usada para guardar el token JWT en el localStorage.
 *
 * Este token normalmente se recibe desde el backend después
 * de que el usuario inicia sesión correctamente. y el auth_user es la clave para guardar los datos del usuario autenticado.
 */
const TOKEN_KEY = 'lp_token';

const USER_KEY = 'lp_auth_user';

/**
 * Servicio encargado de gestionar la sesión del usuario en el frontend.
 *
 * Responsabilidades principales:
 * - Guardar el token JWT.
 * - Obtener el token JWT.
 * - Eliminar el token JWT.
 * - Guardar los datos del usuario autenticado.
 * - Obtener los datos del usuario autenticado.
 * - Limpiar toda la sesión.
 * - Verificar si el usuario está logueado.
 *
 * Este servicio usa localStorage, por lo tanto los datos permanecen
 * guardados incluso si se recarga la página.
 */
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  /**
   * Guarda el token JWT en el localStorage.
   *
   * Este método se usa normalmente después de un login exitoso.
   *
   * @param token Token JWT recibido desde el backend.
   */
  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Obtiene el token JWT guardado en el localStorage.
   *
   * Este método puede ser usado por:
   * - Interceptores HTTP para enviar el token en cada petición.
   * - Guards para validar si el usuario tiene sesión activa.
   * - Servicios que necesiten verificar autenticación.
   *
   * @returns El token JWT si existe, o null si no hay token guardado.
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Elimina solamente el token JWT del localStorage.
   *
   * Este método puede usarse cuando:
   * - El usuario cierra sesión.
   * - El token expiró.
   * - La sesión debe invalidarse.
   */
  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  /**
   * Guarda la información del usuario autenticado en el localStorage.
   *
   * Como localStorage solo guarda texto, el objeto user se convierte
   * a formato JSON usando JSON.stringify().
   *
   * @param user Objeto con los datos del usuario autenticado.
   */
  saveUser(user: unknown): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /**
   * Obtiene la información del usuario autenticado desde el localStorage.
   *
   * Usa un tipo genérico <T> para que puedas indicar desde fuera
   * qué forma tendrá el objeto usuario.
   *
   * Ejemplo de uso:
   *
   * const user = this.tokenService.getUser<UsuarioAuth>();
   *
   * @returns El usuario convertido a objeto, o null si no existe.
   */
  getUser<T>(): T | null {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) as T : null;
  }

  /**
   * Elimina solamente los datos del usuario autenticado.
   *
   * No elimina el token, solo la información guardada bajo USER_KEY.
   */
  clearUser(): void {
    localStorage.removeItem(USER_KEY);
  }

  /**
   * Limpia toda la sesión del usuario.
   *
   * Elimina:
   * - Token JWT.
   * - Datos del usuario autenticado.
   *
   * Este método se usa normalmente al cerrar sesión.
   */
  clearSession(): void {
    this.clearToken();
    this.clearUser();
  }

  /**
   * Verifica si el usuario tiene una sesión activa.
   *
   * Actualmente solo comprueba si existe un token guardado.
   *
   * Importante:
   * Este método no valida si el token está expirado,
   * solo verifica que exista en localStorage.
   *
   * @returns true si existe token, false si no existe.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}