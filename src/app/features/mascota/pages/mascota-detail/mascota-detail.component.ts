import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MascotaDetail } from '../../../../core/models/mascota.models';
import { ApiErrorResponse } from '../../../../core/models/auth.models';
import { MascotaService } from '../../../../core/services/mascota.service';

@Component({
  selector: 'app-mascota-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mascota-detail.component.html',
  styleUrl: './mascota-detail.component.css'
})
export class MascotaDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private mascotaService = inject(MascotaService);

  mascota: MascotaDetail | null = null;
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    const rawId = this.route.snapshot.paramMap.get('id');
    const id = Number(rawId);

    if (!rawId || Number.isNaN(id) || id <= 0) {
      this.errorMessage = 'Id de mascota inválido.';
      this.loading = false;
      return;
    }

    this.mascotaService.detalle(id).subscribe({
      next: (data) => {
        this.mascota = data;
        this.loading = false;
      },
      error: (err) => {
        const apiError = err?.error as ApiErrorResponse;
        this.errorMessage = apiError?.message || 'No se pudo cargar el detalle de la mascota.';
        this.loading = false;
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