import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service'; 

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const authReq = req.clone({
          setHeaders: {
            Authorization: token ? `Bearer ${token}` : ''
          }
        });
        return next.handle(authReq);
      })
    );
  }
}
