import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CrearSolicitudAdopcionRequest,
  SolicitudAdopcionResponse
} from '../models/adopcion-solicitud.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdopcionSolicitudService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/solicitudes-adopcion`;

  crear(payload: CrearSolicitudAdopcionRequest): Observable<SolicitudAdopcionResponse> {
    return this.http.post<SolicitudAdopcionResponse>(this.apiUrl, payload);
  }

  misSolicitudes(): Observable<SolicitudAdopcionResponse[]> {
    return this.http.get<SolicitudAdopcionResponse[]>(`${this.apiUrl}/mis-solicitudes`);
  }

  detalle(id: number): Observable<SolicitudAdopcionResponse> {
    return this.http.get<SolicitudAdopcionResponse>(`${this.apiUrl}/${id}`);
  }
}
