import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MascotaListItem } from '../../../../core/models/mascota.models';
import { ApiErrorResponse } from '../../../../core/models/auth.models';
import { MascotaService } from '../../../../core/services/mascota.service';

@Component({
  selector: 'app-mascota-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mascota-list.component.html',
  styleUrl: './mascota-list.component.css'
})
export class MascotaListComponent implements OnInit {
  private mascotaService = inject(MascotaService);

  mascotas: MascotaListItem[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.cargarMascotas();
  }

  cargarMascotas(): void {
    this.loading = true;
    this.errorMessage = '';

    this.mascotaService.listar().subscribe({
      next: (data) => {
        this.mascotas = data;
        this.loading = false;
      },
      error: (err) => {
        const apiError = err?.error as ApiErrorResponse;
        this.errorMessage = apiError?.message || 'No se pudieron cargar las mascotas.';
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