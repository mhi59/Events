import { AuthService } from './../service/authService';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { Observer, Subscription, Observable, of } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  hide = true;
  invalidLogin: boolean;
  credentialsValidators: Subscription;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }



  onSubmit(form: NgForm) {
    const credentials = JSON.stringify(form.value); // Donnée user et pass entrées
    this.authService.connectToHost(credentials);
    this.credentialsValidators = this.authService.connectSubject.subscribe( (response) => {
      this.invalidLogin = response;
      if (this.invalidLogin)
      {
        this.router.navigate(['/timeline']);
      }
    });
  }

  onLogOut()
  {
    this.authService.logOut();
  }
}
