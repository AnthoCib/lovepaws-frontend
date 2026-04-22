export interface SolicitudAdopcionCreateRequest {
  mascotaId: number;
  motivo?: string;
}

export interface SolicitudAdopcionResponse {
  id: number;
  fechaSolicitud?: string;
  motivo?: string;
  observacionRevision?: string | null;
  mascota?: {
    id: number;
    nombre: string;
    fotoUrl?: string | null;
  } | null;
  usuario?: {
    id: number;
    nombre?: string;
    username?: string;
  } | null;
  estado?: {
    id: string;
    descripcion?: string;
  } | null;
}

export interface SolicitudAdopcionDetail {
  id: number;
  fechaSolicitud?: string;
  motivo?: string;
  observacionRevision?: string | null;
  mascota?: {
    id: number;
    nombre: string;
    fotoUrl?: string | null;
  } | null;
  usuario?: {
    id: number;
    nombre?: string;
    username?: string;
  } | null;
  estado?: {
    id: string;
    descripcion?: string;
  } | null;
}