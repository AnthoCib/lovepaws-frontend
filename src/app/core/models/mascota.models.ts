export interface MascotaListItem {
  id: number;
  nombre: string;
  edad?: number | null;
  sexo: string;
  descripcion: string;
  fotoUrl: string | null;
  categoriaId: number;
  categoriaNombre: string;
  razaId: number;
  razaNombre: string;
  estadoId: string;
  estadoDescripcion: string;
  usuarioCreacionId: number;
}

export interface MascotaDetail {
  id: number;
  nombre: string;
  edad?: number | null;
  sexo: string;
  descripcion: string;
  fotoUrl: string | null;
  categoriaId: number;
  categoriaNombre: string;
  razaId: number;
  razaNombre: string;
  estadoId: string;
  estadoDescripcion: string;
  usuarioCreacionId: number;
}