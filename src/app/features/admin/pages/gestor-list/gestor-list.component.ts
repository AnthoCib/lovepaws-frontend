import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiErrorResponse } from '../../../../core/models/auth.models';
import { GestorResponse } from '../../../../core/models/admin.models';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-gestor-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestor-list.component.html',
  styleUrl: './gestor-list.component.css'
})
export class GestorListComponent implements OnInit {
  private adminService = inject(AdminService);

  gestores: GestorResponse[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.errorMessage = '';

    this.adminService.listarGestores().subscribe({
      next: (data) => {
        this.gestores = data;
        this.loading = false;
      },
      error: (err) => {
        const apiError = err?.error as ApiErrorResponse;
        this.errorMessage = apiError?.message || 'No se pudieron cargar los gestores.';
        this.loading = false;
      }
    });
  }
}