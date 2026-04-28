import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { ApiErrorResponse } from '../../../../core/models/auth.models';
import { AdminUserService } from '../../../../core/services/admin-user.service';

@Component({
  selector: 'app-usuario-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './usuario-edit.component.html',
  styleUrl: './usuario-edit.component.css'
})
export class UsuarioEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private adminUserService = inject(AdminUserService);

  id = 0;
  roles: string[] = [];
  loading = true;
  saving = false;
  errorMessage = '';
  successMessage = '';

  form = this.fb.group({
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(4)]],
    telefono: [''],
    direccion: ['', [Validators.minLength(5)]],
    rolNombre: ['', [Validators.required]],
    estadoId: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.adminUserService.listarRoles().subscribe({
      next: (roles) => this.roles = roles
    });

    this.adminUserService.detalle(this.id).subscribe({
      next: (user) => {
        this.form.patchValue({
          nombre: user.nombre,
          correo: user.correo,
          username: user.username,
          telefono: user.telefono || '',
          direccion: user.direccion || '',
          rolNombre: user.rol || 'GESTOR',
          estadoId: user.estado || 'ACTIVO'
        });
        this.loading = false;
      },
      error: (err) => {
        const apiError = err?.error as ApiErrorResponse;
        this.errorMessage = apiError?.message || 'No se pudo cargar el usuario.';
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.adminUserService.actualizar(this.id, {
      nombre: this.form.value.nombre!.trim(),
      correo: this.form.value.correo!.trim(),
      username: this.form.value.username!.trim(),
      telefono: this.form.value.telefono?.trim() || null,
      direccion: this.form.value.direccion?.trim() || null
    }).subscribe({
      next: () => {
        this.adminUserService.actualizarRol(this.id, {
          rolNombre: this.form.value.rolNombre!
        }).subscribe({
          next: () => {
            this.adminUserService.actualizarEstado(this.id, {
              estadoId: this.form.value.estadoId!
            })
            .pipe(finalize(() => this.saving = false))
            .subscribe({
              next: () => {
                this.successMessage = 'Usuario actualizado correctamente.';
                setTimeout(() => this.router.navigate(['/admin/usuarios']), 900);
              },
              error: (err) => {
                const apiError = err?.error as ApiErrorResponse;
                this.errorMessage = apiError?.message || 'No se pudo actualizar el estado.';
              }
            });
          },
          error: (err) => {
            this.saving = false;
            const apiError = err?.error as ApiErrorResponse;
            this.errorMessage = apiError?.message || 'No se pudo actualizar el rol.';
          }
        });
      },
      error: (err) => {
        this.saving = false;
        const apiError = err?.error as ApiErrorResponse;
        this.errorMessage = apiError?.message || 'No se pudo actualizar el usuario.';
      }
    });
  }
}