export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  expiresIn: number;
  publicId: string;
  username: string;
  correo: string;
  role: string;
}

export interface AuthMeResponse {
  publicId: string;
  username: string;
  correo: string;
  nombreCompleto: string;
  fotoUrl: string | null;
  roles: string[];
}

export interface ApiErrorResponse {
  code?: string;
  message: string;
  details?: string[];
  traceId?: string;
  timestamp?: string;
  status?: number;
  error?: string;
  path?: string;
}