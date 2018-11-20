import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from './authService';
import { Injectable } from '@angular/core';
import {  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public auth: AuthService, private jwtHelperService: JwtHelperService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        request = request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + this.jwtHelperService.tokenGetter()
            }
        });

        return next.handle(request);
    }
}