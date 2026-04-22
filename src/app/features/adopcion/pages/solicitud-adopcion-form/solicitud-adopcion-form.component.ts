import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { ApiErrorResponse } from '../../../../core/models/auth.models';
import { MascotaDetail } from '../../../../core/models/mascota.models';
import { AdopcionService } from '../../../../core/services/adopcion.service';
import { MascotaService } from '../../../../core/services/mascota.service';

@Component({
  selector: 'app-solicitud-adopcion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './solicitud-adopcion-form.component.html',
  styleUrl: './solicitud-adopcion-form.component.css'
})
export class SolicitudAdopcionFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private mascotaService = inject(MascotaService);
  private adopcionService = inject(AdopcionService);
  private router = inject(Router);

  mascota: MascotaDetail | null = null;
  loadingMascota = true;
  saving = false;
  errorMessage = '';
  successMessage = '';

  form = this.fb.group({
    motivo: ['', [Validators.maxLength(500)]]
  });

  ngOnInit(): void {
    const rawId = this.route.snapshot.paramMap.get('mascotaId');
    const mascotaId = Number(rawId);

    if (!rawId || Number.isNaN(mascotaId) || mascotaId <= 0) {
      this.errorMessage = 'Id de mascota inválido.';
      this.loadingMascota = false;
      return;
    }

    this.mascotaService.detalle(mascotaId).subscribe({
      next: (data) => {
        this.mascota = data;
        this.loadingMascota = false;
      },
      error: (err) => {
        const apiError = err?.error as ApiErrorResponse;
        this.errorMessage = apiError?.message || 'No se pudo cargar la mascota.';
        this.loadingMascota = false;
      }
    });
  }

  submit(): void {
    if (!this.mascota) return;

    this.errorMessage = '';
    this.successMessage = '';
    this.saving = true;

    this.adopcionService.crear({
      mascotaId: this.mascota.id,
      motivo: this.form.value.motivo?.trim() || ''
    })
    .pipe(finalize(() => this.saving = false))
    .subscribe({
      next: () => {
        this.successMessage = 'Tu solicitud de adopción fue enviada correctamente.';
        setTimeout(() => {
          this.router.navigate(['/adopciones/mis-solicitudes']);
        }, 900);
      },
      error: (err) => {
        const apiError = err?.error as ApiErrorResponse;
        this.errorMessage = apiError?.message || 'No se pudo registrar la solicitud.';
      }
    });
  }

  getSexoLabel(sexo: string | null | undefined): string {
    if (!sexo) return 'No especificado';
    if (sexo === 'M') return 'Macho';
    if (sexo === 'H') return 'Hembra';
    return sexo;
  }
}