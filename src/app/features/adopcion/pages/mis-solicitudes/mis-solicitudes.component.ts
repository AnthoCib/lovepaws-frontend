import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiErrorResponse } from '../../../../core/models/auth.models';
import { SolicitudAdopcionResponse } from '../../../../core/models/adopcion-solicitud.models';
import { AdopcionSolicitudService } from '../../../../core/services/adopcion-solicitud.service';

@Component({
  selector: 'app-mis-solicitudes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-solicitudes.component.html',
  styleUrl: './mis-solicitudes.component.css'
})
export class MisSolicitudesComponent implements OnInit {
  private adopcionSolicitudService = inject(AdopcionSolicitudService);

  solicitudes: SolicitudAdopcionResponse[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.errorMessage = '';

    this.adopcionSolicitudService.misSolicitudes().subscribe({
      next: (data) => {
        this.solicitudes = data;
        this.loading = false;
      },
      error: (err) => {
        const apiError = err?.error as ApiErrorResponse;
        this.errorMessage = apiError?.message || 'No se pudieron cargar tus solicitudes.';
        this.loading = false;
      }
    });
  }
}