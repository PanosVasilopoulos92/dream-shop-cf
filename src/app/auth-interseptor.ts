import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authToken: any = null;

  constructor(private loginService: LoginService) {
    // Subscribe to the authTokenSubject to update the interceptor's token
    this.loginService.authTokenSubject.subscribe(token => {
      this.authToken = token;
      localStorage.setItem('authToken', this.authToken);
      console.log(this.authToken);
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authToken) {
      const authRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${this.authToken}` }
      });
      return next.handle(authRequest);
    }

    return next.handle(request);
  }
}
