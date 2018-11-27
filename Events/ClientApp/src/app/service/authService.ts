import { Injectable } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

    connectSubject = new Subject<boolean>();
    invalidLogin: boolean;
    constructor(private http: HttpClient) {}

    connectToHost(credentials: any) {

      this.http.post('https://localhost:44320/api/auth', credentials, { // On contact l'api pour récupérer le token
          headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).subscribe((response) => {
        const token = (<any>response).token;
        localStorage.setItem('jwt', token);
        this.invalidLogin = false;
        this.emitConnectSubject();
      }, (error) => {
        this.invalidLogin = true;
        this.emitConnectSubject();
      });
    }

    logOut() {
        localStorage.removeItem('jwt');
        this.invalidLogin = true;
        this.emitConnectSubject();
    }

    emitConnectSubject() {
        this.connectSubject.next(!this.invalidLogin);
    }
}
