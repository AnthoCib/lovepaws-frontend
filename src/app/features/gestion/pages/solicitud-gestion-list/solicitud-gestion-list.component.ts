import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiErrorResponse } from '../../../../core/models/auth.models';
import { GestionSolicitudResponse } from '../../../../core/models/gestion-solicitud.models';
import { GestionSolicitudService } from '../../../../core/services/gestion-solicitud.service';

@Component({
  selector: 'app-solicitud-gestion-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './solicitud-gestion-list.component.html',
  styleUrl: './solicitud-gestion-list.component.css'
})
export class SolicitudGestionListComponent implements OnInit {
  private gestionSolicitudService = inject(GestionSolicitudService);

  solicitudes = signal<GestionSolicitudResponse[]>([]);
  loading = true;
  errorMessage = '';

  searchText = signal('');
  selectedStatus = signal('');

  readonly filteredSolicitudes = computed(() => {
    const text = this.searchText().trim().toLowerCase();
    const status = this.selectedStatus().trim().toUpperCase();

    return this.solicitudes().filter((item) => {
      const id = String(item.id);
      const adoptanteId = String(item.adoptanteId);
      const adoptanteNombre = (item.adoptanteNombre || '').toLowerCase();
      const adoptanteCorreo = (item.adoptanteCorreo || '').toLowerCase();
      const mascotaId = String(item.mascotaId);
      const mascotaNombre = (item.mascotaNombre || '').toLowerCase();
      const mensaje = (item.mensaje || '').toLowerCase();
      const estado = (item.estado || '').toUpperCase();

      const matchesText =
        !text ||
        id.includes(text) ||
        adoptanteId.includes(text) ||
        adoptanteNombre.includes(text) ||
        adoptanteCorreo.includes(text) ||
        mascotaId.includes(text) ||
        mascotaNombre.includes(text) ||
        mensaje.includes(text);

      const matchesStatus = !status || estado === status;

      return matchesText && matchesStatus;
    });
  });

  readonly availableStatuses = computed(() => {
    const statuses = this.solicitudes()
      .map(item => (item.estado || '').trim())
      .filter(status => !!status);

    return [...new Set(statuses)].sort();
  });

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.errorMessage = '';

    this.gestionSolicitudService.listar().subscribe({
      next: (data) => {
        this.solicitudes.set(data);
        this.loading = false;
      },
      error: (err) => {
        const apiError = err?.error as ApiErrorResponse;
        this.errorMessage = apiError?.message || 'No se pudieron cargar las solicitudes.';
        this.loading = false;
      }
    });
  }

  clearFilters(): void {
    this.searchText.set('');
    this.selectedStatus.set('');
  }

  hasActiveFilters(): boolean {
    return !!this.searchText().trim() || !!this.selectedStatus();
  }
}