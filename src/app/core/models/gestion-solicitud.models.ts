export interface GestionSolicitudResponse {
  id: number;

  adoptanteId: number;
  adoptanteNombre?: string | null;
  adoptanteCorreo?: string | null;

  mascotaId: number;
  mascotaNombre?: string | null;
  mascotaFotoUrl?: string | null;

  estado: string;
  fechaCreacion?: string;
  fechaActualizacion?: string;
  mensaje?: string | null;
}

export interface GestionSolicitudEstadoRequest {
  estado: string;
  comentario?: string | null;
}