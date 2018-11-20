import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class Authentication {
    constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {}

    loggedIn() {
        const token: string = this.jwtHelperService.tokenGetter();

        if(!token) {
            return false;
        }

        const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token);

        return !tokenExpired;
    }
}