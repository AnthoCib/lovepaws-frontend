import { Injectable } from '@angular/core';

const TOKEN_KEY = 'lp_token';
const USER_KEY = 'lp_auth_user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  saveUser(user: unknown): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser<T>(): T | null {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) as T : null;
  }

  clearUser(): void {
    localStorage.removeItem(USER_KEY);
  }

  clearSession(): void {
    this.clearToken();
    this.clearUser();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}