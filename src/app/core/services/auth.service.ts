import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';
import { AuthMeResponse, LoginRequest, LoginResponse } from '../models/auth.models';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  private readonly apiUrl = 'http://localhost:8080/api/auth';

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, payload).pipe(
      tap(response => {
        this.tokenService.saveToken(response.token);
        this.tokenService.saveUser(response);
      })
    );
  }

  me(): Observable<AuthMeResponse> {
    return this.http.get<AuthMeResponse>(`${this.apiUrl}/me`).pipe(
      tap(user => this.tokenService.saveUser(user))
    );
  }

  loginAndLoadProfile(payload: LoginRequest): Observable<AuthMeResponse> {
    return this.login(payload).pipe(
      switchMap(() => this.me())
    );
  }

  logout(): void {
    this.tokenService.clearSession();
  }

  isAuthenticated(): boolean {
    return this.tokenService.isLoggedIn();
  }

  getStoredUser<T>(): T | null {
    return this.tokenService.getUser<T>();
  }

  getToken(): string | null {
    return this.tokenService.getToken();
  }
}