import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AdminDashboardResponse,
  GestorCreateRequest,
  GestorResponse
} from '../models/admin.models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);

  private readonly dashboardUrl = 'https://lovepaws.onrender.com/api/admin/dashboard';
  private readonly gestoresUrl = 'https://lovepaws.onrender.com/api/admin/gestores';

  getDashboard(): Observable<AdminDashboardResponse> {
    return this.http.get<AdminDashboardResponse>(this.dashboardUrl);
  }

  crearGestor(payload: GestorCreateRequest): Observable<GestorResponse> {
    return this.http.post<GestorResponse>(this.gestoresUrl, payload);
  }

  listarGestores(): Observable<GestorResponse[]> {
    return this.http.get<GestorResponse[]>(this.gestoresUrl);
  }
}