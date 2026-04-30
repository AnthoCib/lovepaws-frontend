import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';
import { roleGuard } from './core/guards/role-guard';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },

      {
        path: 'mascotas',
        canActivate: [roleGuard],
        data: { roles: ['ADOPTANTE'] },
        loadComponent: () =>
          import('./features/mascota/pages/mascota-list/mascota-list.component').then(m => m.MascotaListComponent)
      },
      {
        path: 'mascotas/:id',
        canActivate: [roleGuard],
        data: { roles: ['ADOPTANTE'] },
        loadComponent: () =>
          import('./features/mascota/pages/mascota-detail/mascota-detail.component').then(m => m.MascotaDetailComponent)
      },

      {
        path: 'adopciones/solicitar/:mascotaId',
        canActivate: [roleGuard],
        data: { roles: ['ADOPTANTE'] },
        loadComponent: () =>
          import('./features/adopcion/pages/solicitud-adopcion-form/solicitud-adopcion-form.component').then(m => m.SolicitudAdopcionFormComponent)
      },
      {
        path: 'adopciones/mis-solicitudes',
        canActivate: [roleGuard],
        data: { roles: ['ADOPTANTE'] },
        loadComponent: () =>
          import('./features/adopcion/pages/mis-solicitudes/mis-solicitudes.component').then(m => m.MisSolicitudesComponent)
      },
      {
        path: 'adopciones/:id',
        canActivate: [roleGuard],
        data: { roles: ['ADOPTANTE'] },
        loadComponent: () =>
          import('./features/adopcion/pages/solicitud-detail/solicitud-detail.component').then(m => m.SolicitudDetailComponent)
      },

      {
        path: 'gestion/solicitudes',
        canActivate: [roleGuard],
        data: { roles: ['GESTOR', 'ADMIN'] },
        loadComponent: () =>
          import('./features/gestion/pages/solicitud-gestion-list/solicitud-gestion-list.component').then(m => m.SolicitudGestionListComponent)
      },
      {
        path: 'gestion/solicitudes/:id',
        canActivate: [roleGuard],
        data: { roles: ['GESTOR', 'ADMIN'] },
        loadComponent: () =>
          import('./features/gestion/pages/solicitud-gestion-detail/solicitud-gestion-detail.component').then(m => m.SolicitudGestionDetailComponent)
      },
      {
        path: 'adopciones/solicitar',
        canActivate: [roleGuard],
        data: { roles: ['ADOPTANTE'] },
        loadComponent: () =>
          import('./features/adopcion/pages/solicitud-create/solicitud-create.component').then(m => m.SolicitudCreateComponent)
      },
      {
        path: 'adopciones/mis-solicitudes/:id',
        canActivate: [roleGuard],
        data: { roles: ['ADOPTANTE'] },
        loadComponent: () =>
          import('./features/adopcion/pages/solicitud-detail/solicitud-detail.component').then(m => m.SolicitudDetailComponent)
      },
{
        path: 'admin',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
        loadComponent: () =>
          import('./features/admin/pages/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'admin/gestores',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
        loadComponent: () =>
          import('./features/admin/pages/gestor-list/gestor-list.component').then(m => m.GestorListComponent)
      },
      {
        path: 'admin/gestores/nuevo',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
        loadComponent: () =>
          import('./features/admin/pages/gestor-form/gestor-form.component').then(m => m.GestorFormComponent)
      }, {
        path: 'admin/usuarios',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
        loadComponent: () =>
          import('./features/admin/pages/usuario-list/usuario-list.component').then(m => m.UsuarioListComponent)
      },
      {
        path: 'admin/usuarios/nuevo',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
        loadComponent: () =>
          import('./features/admin/pages/usuario-form/usuario-form.component').then(m => m.UsuarioFormComponent)
      },
      {
        path: 'admin/usuarios/:id/editar',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
        loadComponent: () =>
          import('./features/admin/pages/usuario-edit/usuario-edit.component').then(m => m.UsuarioEditComponent)
      },
      {
        path: 'admin/roles',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
        loadComponent: () =>
          import('./features/admin/pages/role-list/role-list.component').then(m => m.RoleListComponent)
      },

      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];