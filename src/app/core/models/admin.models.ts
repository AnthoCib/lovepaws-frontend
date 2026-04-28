export interface AdminDashboardResponse {
  totalUsuarios: number;
  totalMascotas: number;
  adopcionesRegistradas: number;
  mascotasDisponibles: number;
  mascotasAdoptadas: number;
  solicitudesPendientes: number;
  solicitudesAprobadas: number;
  solicitudesRechazadas: number;
}

export interface GestorCreateRequest {
  nombre: string;
  correo: string;
  username: string;
  password: string;
  telefono?: string | null;
  direccion?: string | null;
}

export interface GestorResponse {
  id: number;
  nombre: string;
  correo: string;
  username: string;
  telefono?: string | null;
  direccion?: string | null;
  fotoUrl?: string | null;
  rol?: string | null;
  estado?: string | null;
}