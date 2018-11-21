import { Observable } from 'rxjs';
import { Authentication } from './authentication';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: Authentication, private router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.auth.loggedIn()) {
            return true;
        } else {
            localStorage.removeItem('jwt');
            this.router.navigate(['/auth']);
            return false;
        }
    }
}
