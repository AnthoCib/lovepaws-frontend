import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  SolicitudAdopcionCreateRequest,
  SolicitudAdopcionResponse,
  SolicitudAdopcionDetail
} from '../models/adopcion.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdopcionService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/solicitudes-adopcion`;

  crear(payload: SolicitudAdopcionCreateRequest): Observable<SolicitudAdopcionResponse> {
    return this.http.post<SolicitudAdopcionResponse>(this.apiUrl, payload);
  }

  listarMisSolicitudes(): Observable<SolicitudAdopcionResponse[]> {
    return this.http.get<SolicitudAdopcionResponse[]>(`${this.apiUrl}/mis-solicitudes`);
  }

  detalle(id: number): Observable<SolicitudAdopcionDetail> {
    return this.http.get<SolicitudAdopcionDetail>(`${this.apiUrl}/${id}`);
  }
}
