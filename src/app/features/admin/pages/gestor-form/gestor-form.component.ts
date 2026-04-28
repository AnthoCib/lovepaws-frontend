import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { ApiErrorResponse } from '../../../../core/models/auth.models';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-gestor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './gestor-form.component.html',
  styleUrl: './gestor-form.component.css'
})
export class GestorFormComponent {
  private fb = inject(FormBuilder);
  private adminService = inject(AdminService);
  private router = inject(Router);

  saving = false;
  errorMessage = '';
  successMessage = '';

  form = this.fb.group({
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    telefono: [''],
    direccion: ['', [Validators.minLength(5)]]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.saving = true;

    this.adminService.crearGestor({
      nombre: this.form.value.nombre!.trim(),
      correo: this.form.value.correo!.trim(),
      username: this.form.value.username!.trim(),
      password: this.form.value.password!,
      telefono: this.form.value.telefono?.trim() || null,
      direccion: this.form.value.direccion?.trim() || null
    })
    .pipe(finalize(() => this.saving = false))
    .subscribe({
      next: () => {
        this.successMessage = 'Gestor registrado correctamente.';
        setTimeout(() => this.router.navigate(['/admin/gestores']), 900);
      },
      error: (err) => {
        const apiError = err?.error as ApiErrorResponse;
        this.errorMessage = apiError?.message || 'No se pudo registrar el gestor.';
      }
    });
  }
}