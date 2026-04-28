export interface AdminUserResponse {
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

export interface AdminUserCreateRequest {
  nombre: string;
  correo: string;
  username: string;
  password: string;
  rolNombre: string;
  telefono?: string | null;
  direccion?: string | null;
}

export interface AdminUserUpdateRequest {
  nombre: string;
  correo: string;
  username: string;
  telefono?: string | null;
  direccion?: string | null;
}

export interface AdminUserRoleUpdateRequest {
  rolNombre: string;
}

export interface AdminUserStatusUpdateRequest {
  estadoId: string;
}