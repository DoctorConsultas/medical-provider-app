import { Injectable } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth0Service, private router: Router) {}

  login() {
    this.auth.loginWithRedirect();
  }

  handleAuthCallback() {
    this.auth.loginWithRedirect({
      appState: {
        target: "/prescriptions",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  }

  logout() {
    this.auth.logout({
      // Use type assertion to bypass type checking
      returnTo: window.location.origin as unknown as string
    } as any);
  }

  // Method to get the token
  getToken(): Observable<string | null> {
    return this.auth.idTokenClaims$.pipe(
      map(claims => claims?.__raw ?? null)
  );
}
}
