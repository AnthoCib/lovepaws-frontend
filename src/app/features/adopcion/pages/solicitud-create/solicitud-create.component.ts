import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { ApiErrorResponse } from '../../../../core/models/auth.models';
import { AdopcionSolicitudService } from '../../../../core/services/adopcion-solicitud.service';

@Component({
  selector: 'app-solicitud-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './solicitud-create.component.html',
  styleUrl: './solicitud-create.component.css'
})
export class SolicitudCreateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private adopcionSolicitudService = inject(AdopcionSolicitudService);

  mascotaId = 0;
  saving = false;
  errorMessage = '';
  successMessage = '';

  form = this.fb.group({
    infoAdicional: [''],
    pqAdoptar: ['', [Validators.required, Validators.minLength(10)]],
    tiempoDedicado: ['', [Validators.required, Validators.minLength(5)]],
    cubrirCostos: ['', [Validators.required, Validators.minLength(5)]],
    planMascota: ['', [Validators.required, Validators.minLength(5)]],
    tipoVivienda: ['', [Validators.required]],
    experiencia: ['', [Validators.required]],
    ninosOtraMascotas: ['', [Validators.required]]
  });

  ngOnInit(): void {
    const mascotaId = Number(this.route.snapshot.queryParamMap.get('mascotaId'));

    if (!mascotaId || Number.isNaN(mascotaId) || mascotaId <= 0) {
      this.errorMessage = 'No se recibió una mascota válida para la solicitud.';
      return;
    }

    this.mascotaId = mascotaId;
  }

  submit(): void {
    if (!this.mascotaId) {
      this.errorMessage = 'Mascota inválida.';
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.saving = true;

    this.adopcionSolicitudService.crear({
      mascotaId: this.mascotaId,
      motivo: this.form.value.pqAdoptar?.trim() || '',
      tiempoDedicado: this.form.value.tiempoDedicado?.trim() || '',
      cubrirCostos: this.form.value.cubrirCostos?.trim() || '',
      planMascota: this.form.value.planMascota?.trim() || '',
      tipoVivienda: this.form.value.tipoVivienda?.trim() || '',
      experiencia: this.form.value.experiencia?.trim() || '',
      ninosOtraMascotas: this.form.value.ninosOtraMascotas?.trim() || '',
      infoAdicional: this.form.value.infoAdicional?.trim() || null
    })
    .pipe(finalize(() => this.saving = false))
    .subscribe({
      next: () => {
        this.successMessage = 'Solicitud enviada correctamente.';
        setTimeout(() => this.router.navigate(['/adopciones/mis-solicitudes']), 900);
      },
      error: (err) => {
        const apiError = err?.error as ApiErrorResponse;
        this.errorMessage = apiError?.message || 'No se pudo registrar la solicitud.';
      }
    });
  }
}