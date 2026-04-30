import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';

import { AuthMeResponse, LoginRequest, LoginResponse } from '../models/auth.models';
import { TokenService } from './token.service';
import { environment } from '../../../environments/environment';

/**
 * Servicio encargado de manejar la autenticación del usuario.
 *
 * Responsabilidades principales:
 * - Enviar las credenciales al backend.
 * - Recibir el token JWT.
 * - Guardar el token y los datos del usuario.
 * - Consultar el perfil del usuario autenticado.
 * - Cerrar sesión.
 * - Validar roles del usuario.
 *
 * Este servicio trabaja junto con TokenService.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Cliente HTTP de Angular.
   *
   * Sirve para realizar peticiones al backend.
   */
  private http = inject(HttpClient);

  /**
   * Servicio encargado de guardar, obtener y limpiar
   * el token y los datos del usuario en localStorage.
   */
  private tokenService = inject(TokenService);

  /**
   * URL base del módulo de autenticación del backend.
   *
   * En desarrollo apunta a localhost.
   *
   * Endpoints esperados:
   * - POST http://localhost:8080/api/auth/login
   * - GET  http://localhost:8080/api/auth/me
   */
  private readonly apiUrl = `${environment.apiUrl}/api/auth`;

  /**
   * Inicia sesión enviando las credenciales al backend.
   *
   * Flujo:
   * 1. Envía email/usuario y contraseña al backend.
   * 2. El backend valida las credenciales.
   * 3. Si son correctas, responde con un token JWT.
   * 4. El token se guarda en localStorage usando TokenService.
   * 5. También se guarda la respuesta del login.
   *
   * @param payload Datos del login. Ejemplo: correo y contraseña.
   * @returns Observable con la respuesta del login.
   */
  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, payload).pipe(
      tap(response => {
        this.tokenService.saveToken(response.token);
        this.tokenService.saveUser(response);
      })
    );
  }

  /**
   * Consulta el perfil del usuario actualmente autenticado.
   *
   * Este método llama al endpoint /me del backend.
   *
   * Normalmente requiere que el token JWT viaje en la cabecera:
   *
   * Authorization: Bearer TOKEN
   *
   * Eso normalmente lo hace un interceptor HTTP.
   *
   * Flujo:
   * 1. Hace una petición GET a /api/auth/me.
   * 2. El backend identifica al usuario por el token.
   * 3. Devuelve sus datos completos y roles.
   * 4. Angular guarda esos datos actualizados en localStorage.
   *
   * @returns Observable con los datos del usuario autenticado.
   */
  me(): Observable<AuthMeResponse> {
    return this.http.get<AuthMeResponse>(`${this.apiUrl}/me`).pipe(
      tap(user => this.tokenService.saveUser(user))
    );
  }

  /**
   * Inicia sesión y luego carga el perfil completo del usuario.
   *
   * Este método combina login() + me().
   *
   * Es útil cuando el login devuelve solo el token,
   * pero necesitas cargar después los datos completos del usuario.
   *
   * Flujo:
   * 1. Ejecuta login(payload).
   * 2. Guarda el token.
   * 3. Cuando termina el login, ejecuta me().
   * 4. Guarda el perfil completo del usuario.
   *
   * switchMap se usa porque primero debe terminar el login
   * y luego recién se debe consultar /me.
   *
   * @param payload Datos del login.
   * @returns Observable con el perfil completo del usuario autenticado.
   */
  loginAndLoadProfile(payload: LoginRequest): Observable<AuthMeResponse> {
    return this.login(payload).pipe(
      switchMap(() => this.me())
    );
  }

  /**
   * Cierra la sesión del usuario.
   *
   * Limpia del localStorage:
   * - Token JWT.
   * - Datos del usuario.
   *
   * Este método no llama al backend.
   * Solo cierra la sesión en el frontend.
   */
  logout(): void {
    this.tokenService.clearSession();
  }

  /**
   * Verifica si el usuario está autenticado.
   *
   * Actualmente solo valida si existe un token guardado.
   *
   * Importante:
   * No verifica si el token expiró.
   *
   * @returns true si existe token, false si no existe.
   */
  isAuthenticated(): boolean {
    return this.tokenService.isLoggedIn();
  }

  /**
   * Obtiene el usuario guardado en localStorage.
   *
   * El tipo esperado es AuthMeResponse.
   *
   * @returns Usuario autenticado o null si no existe.
   */
  getStoredUser(): AuthMeResponse | null {
    return this.tokenService.getUser<AuthMeResponse>();
  }

  /**
   * Obtiene el token JWT guardado.
   *
   * Este método puede ser usado por interceptores,
   * guards u otros servicios.
   *
   * @returns Token JWT o null si no existe.
   */
  getToken(): string | null {
    return this.tokenService.getToken();
  }

  /**
   * Obtiene la lista de roles del usuario autenticado.
   *
   * Si no hay usuario guardado, devuelve un arreglo vacío.
   *
   * Ejemplo:
   * ['ADMIN']
   * ['GESTOR']
   * ['ADOPTANTE']
   *
   * @returns Lista de roles del usuario.
   */
  getRoles(): string[] {
    return this.getStoredUser()?.roles ?? [];
  }

  /**
   * Verifica si el usuario tiene un rol específico.
   *
   * @param role Rol que se desea validar.
   * @returns true si el usuario tiene ese rol, false si no.
   */
  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  /**
   * Verifica si el usuario tiene al menos uno de los roles indicados.
   *
   * Es útil para rutas o menús permitidos para más de un rol.
   *
   * Ejemplo:
   * hasAnyRole(['ADMIN', 'GESTOR'])
   *
   * @param roles Lista de roles permitidos.
   * @returns true si el usuario tiene al menos uno de esos roles.
   */
  hasAnyRole(roles: string[]): boolean {
    const currentRoles = this.getRoles();

    return roles.some(role => currentRoles.includes(role));
  }

  /**
   * Verifica si el usuario autenticado tiene rol ADMIN.
   *
   * @returns true si tiene rol ADMIN.
   */
  isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  /**
   * Verifica si el usuario autenticado tiene rol GESTOR.
   *
   * @returns true si tiene rol GESTOR.
   */
  isGestor(): boolean {
    return this.hasRole('GESTOR');
  }

  /**
   * Verifica si el usuario autenticado tiene rol ADOPTANTE.
   *
   * @returns true si tiene rol ADOPTANTE.
   */
  isAdoptante(): boolean {
    return this.hasRole('ADOPTANTE');
  }
}
