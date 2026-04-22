import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiErrorResponse } from '../../../../core/models/auth.models';
import { SolicitudAdopcionDetail } from '../../../../core/models/adopcion.models';
import { AdopcionService } from '../../../../core/services/adopcion.service';

@Component({
  selector: 'app-solicitud-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './solicitud-detail.component.html',
  styleUrl: './solicitud-detail.component.css'
})
export class SolicitudDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private adopcionService = inject(AdopcionService);

  solicitud: SolicitudAdopcionDetail | null = null;
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    const rawId = this.route.snapshot.paramMap.get('id');
    const id = Number(rawId);

    if (!rawId || Number.isNaN(id) || id <= 0) {
      this.errorMessage = 'Id de solicitud inválido.';
      this.loading = false;
      return;
    }

    this.adopcionService.detalle(id).subscribe({
      next: (data) => {
        this.solicitud = data;
        this.loading = false;
      },
      error: (err) => {
        const apiError = err?.error as ApiErrorResponse;
        this.errorMessage = apiError?.message || 'No se pudo cargar el detalle de la solicitud.';
        this.loading = false;
      }
    });
  }
}