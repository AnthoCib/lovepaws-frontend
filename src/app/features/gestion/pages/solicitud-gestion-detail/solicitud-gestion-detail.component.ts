import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { ApiErrorResponse } from '../../../../core/models/auth.models';
import { GestionSolicitudResponse } from '../../../../core/models/gestion-solicitud.models';
import { GestionSolicitudService } from '../../../../core/services/gestion-solicitud.service';

@Component({
  selector: 'app-solicitud-gestion-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './solicitud-gestion-detail.component.html',
  styleUrl: './solicitud-gestion-detail.component.css'
})
export class SolicitudGestionDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private gestionSolicitudService = inject(GestionSolicitudService);

  solicitud: GestionSolicitudResponse | null = null;
  loading = true;
  saving = false;
  errorMessage = '';
  successMessage = '';

  form = this.fb.group({
    comentario: ['', [Validators.maxLength(500)]]
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id || Number.isNaN(id) || id <= 0) {
      this.errorMessage = 'Id de solicitud inválido.';
      this.loading = false;
      return;
    }

    this.gestionSolicitudService.detalle(id).subscribe({
      next: (data) => {
        this.solicitud = data;
        this.form.patchValue({
          comentario: data.mensaje || ''
        });
        this.loading = false;
      },
      error: (err) => {
        const apiError = err?.error as ApiErrorResponse;
        this.errorMessage = apiError?.message || 'No se pudo cargar la solicitud.';
        this.loading = false;
      }
    });
  }

  aceptarSolicitud(): void {
    this.actualizarEstado('APROBADA');
  }

  rechazarSolicitud(): void {
    this.actualizarEstado('RECHAZADA');
  }

  private actualizarEstado(estado: string): void {
    if (!this.solicitud) {
      return;
    }

    this.saving = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.gestionSolicitudService.cambiarEstado(this.solicitud.id, {
      estado,
      comentario: this.form.value.comentario?.trim() || ''
    })
    .pipe(finalize(() => this.saving = false))
    .subscribe({
      next: (data) => {
        this.solicitud = data;
        this.successMessage =
          estado === 'APROBADA'
            ? 'Solicitud aceptada correctamente.'
            : 'Solicitud rechazada correctamente.';
      },
      error: (err) => {
        const apiError = err?.error as ApiErrorResponse;
        this.errorMessage = apiError?.message || 'No se pudo actualizar la solicitud.';
      }
    });
  }

  get puedeGestionarse(): boolean {
    if (!this.solicitud?.estado) {
      return false;
    }

    return this.solicitud.estado === 'PENDIENTE' || this.solicitud.estado === 'EN_REVISION';
  }
}