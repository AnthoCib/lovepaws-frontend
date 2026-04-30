import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AdminUserCreateRequest,
  AdminUserResponse,
  AdminUserRoleUpdateRequest,
  AdminUserStatusUpdateRequest,
  AdminUserUpdateRequest
} from '../models/admin-user.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/admin/usuarios`;

  listar(): Observable<AdminUserResponse[]> {
    return this.http.get<AdminUserResponse[]>(this.apiUrl);
  }

  detalle(id: number): Observable<AdminUserResponse> {
    return this.http.get<AdminUserResponse>(`${this.apiUrl}/${id}`);
  }

  crear(payload: AdminUserCreateRequest): Observable<AdminUserResponse> {
    return this.http.post<AdminUserResponse>(this.apiUrl, payload);
  }

  actualizar(id: number, payload: AdminUserUpdateRequest): Observable<AdminUserResponse> {
    return this.http.put<AdminUserResponse>(`${this.apiUrl}/${id}`, payload);
  }

  actualizarRol(id: number, payload: AdminUserRoleUpdateRequest): Observable<AdminUserResponse> {
    return this.http.patch<AdminUserResponse>(`${this.apiUrl}/${id}/rol`, payload);
  }

  actualizarEstado(id: number, payload: AdminUserStatusUpdateRequest): Observable<AdminUserResponse> {
    return this.http.patch<AdminUserResponse>(`${this.apiUrl}/${id}/estado`, payload);
  }

  listarRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/roles/catalogo`);
  }
}
