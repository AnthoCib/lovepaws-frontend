import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';
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
        loadComponent: () =>
          import('./features/mascota/pages/mascota-list/mascota-list.component').then(m => m.MascotaListComponent)
      },
      {
        path: 'mascotas/:id',
        loadComponent: () =>
          import('./features/mascota/pages/mascota-detail/mascota-detail.component').then(m => m.MascotaDetailComponent)
      },
      {
        path: 'adopciones/solicitar/:mascotaId',
        loadComponent: () =>
          import('./features/adopcion/pages/solicitud-adopcion-form/solicitud-adopcion-form.component').then(m => m.SolicitudAdopcionFormComponent)
      },
      {
        path: 'adopciones/mis-solicitudes',
        loadComponent: () =>
          import('./features/adopcion/pages/mis-solicitudes/mis-solicitudes.component').then(m => m.MisSolicitudesComponent)
      },
      {
        path: 'adopciones/:id',
        loadComponent: () =>
          import('./features/adopcion/pages/solicitud-detail/solicitud-detail.component').then(m => m.SolicitudDetailComponent)
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