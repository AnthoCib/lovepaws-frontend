import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { ApiErrorResponse } from '../../../../core/models/auth.models';
import { AdminUserService } from '../../../../core/services/admin-user.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private adminUserService = inject(AdminUserService);
  private router = inject(Router);

  roles: string[] = [];
  saving = false;
  loadingRoles = true;
  errorMessage = '';
  successMessage = '';

  form = this.fb.group({
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    rolNombre: ['GESTOR', [Validators.required]],
    telefono: [''],
    direccion: ['', [Validators.minLength(5)]]
  });

  ngOnInit(): void {
    this.adminUserService.listarRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
        this.loadingRoles = false;
      },
      error: () => {
        this.loadingRoles = false;
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

    this.adminUserService.crear({
      nombre: this.form.value.nombre!.trim(),
      correo: this.form.value.correo!.trim(),
      username: this.form.value.username!.trim(),
      password: this.form.value.password!,
      rolNombre: this.form.value.rolNombre!,
      telefono: this.form.value.telefono?.trim() || null,
      direccion: this.form.value.direccion?.trim() || null
    })
    .pipe(finalize(() => this.saving = false))
    .subscribe({
      next: () => {
        this.successMessage = 'Usuario creado correctamente.';
        setTimeout(() => this.router.navigate(['/admin/usuarios']), 900);
      },
      error: (err) => {
        const apiError = err?.error as ApiErrorResponse;
        this.errorMessage = apiError?.message || 'No se pudo crear el usuario.';
      }
    });
  }
}