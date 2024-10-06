import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../models/Auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api/auth/login';
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string, info: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password, info}).pipe(
      tap((response: AuthResponse )=> {
        this.setToken(response.token);
        this.setRole(response.role);
      })
    );
  }

  logout(): void {
    this.clearToken();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  setRole(role: string): void {
    localStorage.setItem('role', role);
  }

  clearToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.tokenSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
