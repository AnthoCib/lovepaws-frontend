import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiErrorResponse } from '../../../../core/models/auth.models';
import { SolicitudAdopcionResponse } from '../../../../core/models/adopcion.models';
import { AdopcionService } from '../../../../core/services/adopcion.service';

@Component({
  selector: 'app-mis-solicitudes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-solicitudes.component.html',
  styleUrl: './mis-solicitudes.component.css'
})
export class MisSolicitudesComponent implements OnInit {
  private adopcionService = inject(AdopcionService);

  solicitudes: SolicitudAdopcionResponse[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.errorMessage = '';

    this.adopcionService.listarMisSolicitudes().subscribe({
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