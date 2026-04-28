import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthMeResponse } from '../../../core/models/auth.models';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  @Input() user: AuthMeResponse | null = null;

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get isGestor(): boolean {
    return this.authService.isGestor();
  }

  get isAdoptante(): boolean {
    return this.authService.isAdoptante();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}