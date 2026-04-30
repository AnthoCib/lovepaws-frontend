import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  GestionSolicitudEstadoRequest,
  GestionSolicitudResponse
} from '../models/gestion-solicitud.models';

@Injectable({
  providedIn: 'root'
})
export class GestionSolicitudService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://lovepaws.onrender.com/api/solicitudes-tracking';

  listar(estado?: string): Observable<GestionSolicitudResponse[]> {
    let params = new HttpParams();

    if (estado && estado.trim()) {
      params = params.set('estado', estado.trim());
    }

    return this.http.get<GestionSolicitudResponse[]>(this.apiUrl, { params });
  }

  detalle(id: number): Observable<GestionSolicitudResponse> {
    return this.http.get<GestionSolicitudResponse>(`${this.apiUrl}/${id}`);
  }

  cambiarEstado(id: number, payload: GestionSolicitudEstadoRequest): Observable<GestionSolicitudResponse> {
    return this.http.patch<GestionSolicitudResponse>(`${this.apiUrl}/${id}/estado`, payload);
  }
}