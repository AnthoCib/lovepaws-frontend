import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MascotaDetail, MascotaListItem } from '../models/mascota.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/mascotas`;

  listar(): Observable<MascotaListItem[]> {
    return this.http.get<MascotaListItem[]>(this.apiUrl);
  }

  detalle(id: number): Observable<MascotaDetail> {
    return this.http.get<MascotaDetail>(`${this.apiUrl}/${id}`);
  }
}
