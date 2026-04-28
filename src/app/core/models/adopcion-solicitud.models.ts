export interface CrearSolicitudAdopcionRequest {
  mascotaId: number;
  motivo: string;
  tiempoDedicado: string;
  cubrirCostos: string;
  planMascota: string;
  tipoVivienda: string;
  experiencia: string;
  ninosOtraMascotas: string;
  infoAdicional?: string | null;
}

export interface SolicitudAdopcionResponse {
  id: number;
  fechaSolicitud?: string;
  infoAdicional?: string | null;
  pqAdoptar?: string | null;
  tiempoDedicado?: string | null;
  cubrirCostos?: string | null;
  planMascota?: string | null;
  tipoVivienda?: string | null;
  experiencia?: string | null;
  ninosOtraMascotas?: string | null;
  estado?: {
    id: string;
    descripcion?: string;
  } | null;
  mascota?: {
    id: number;
    nombre: string;
    fotoUrl?: string | null;
  } | null;
}