import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiErrorResponse } from '../../../../core/models/auth.models';
import { AdminUserResponse } from '../../../../core/models/admin-user.models';
import { AdminUserService } from '../../../../core/services/admin-user.service';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent implements OnInit {
  private adminUserService = inject(AdminUserService);

  usuarios = signal<AdminUserResponse[]>([]);
  loading = true;
  errorMessage = '';

  searchText = signal('');
  selectedRole = signal('');
  selectedStatus = signal('');

  readonly filteredUsers = computed(() => {
    const text = this.searchText().trim().toLowerCase();
    const role = this.selectedRole().trim().toUpperCase();
    const status = this.selectedStatus().trim().toUpperCase();

    return this.usuarios().filter((user) => {
      const nombre = (user.nombre || '').toLowerCase();
      const correo = (user.correo || '').toLowerCase();
      const username = (user.username || '').toLowerCase();
      const telefono = (user.telefono || '').toLowerCase();
      const direccion = (user.direccion || '').toLowerCase();
      const rol = (user.rol || '').toUpperCase();
      const estado = (user.estado || '').toUpperCase();

      const matchesText =
        !text ||
        nombre.includes(text) ||
        correo.includes(text) ||
        username.includes(text) ||
        telefono.includes(text) ||
        direccion.includes(text);

      const matchesRole = !role || rol === role;
      const matchesStatus = !status || estado === status;

      return matchesText && matchesRole && matchesStatus;
    });
  });

  readonly availableRoles = computed(() => {
    const roles = this.usuarios()
      .map(user => (user.rol || '').trim())
      .filter(role => !!role);

    return [...new Set(roles)].sort();
  });

  readonly availableStatuses = computed(() => {
    const statuses = this.usuarios()
      .map(user => (user.estado || '').trim())
      .filter(status => !!status);

    return [...new Set(statuses)].sort();
  });

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.errorMessage = '';

    this.adminUserService.listar().subscribe({
      next: (data) => {
        this.usuarios.set(data);
        this.loading = false;
      },
      error: (err) => {
        const apiError = err?.error as ApiErrorResponse;
        this.errorMessage = apiError?.message || 'No se pudieron cargar los usuarios.';
        this.loading = false;
      }
    });
  }

  clearFilters(): void {
    this.searchText.set('');
    this.selectedRole.set('');
    this.selectedStatus.set('');
  }

  hasActiveFilters(): boolean {
    return !!this.searchText().trim() || !!this.selectedRole() || !!this.selectedStatus();
  }
}