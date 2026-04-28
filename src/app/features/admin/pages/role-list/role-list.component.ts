import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AdminUserService } from '../../../../core/services/admin-user.service';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent implements OnInit {
  private adminUserService = inject(AdminUserService);

  roles: string[] = [];

  ngOnInit(): void {
    this.adminUserService.listarRoles().subscribe({
      next: (data) => this.roles = data
    });
  }
}