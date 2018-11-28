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
  validLogin: boolean;
  credentialsValidators: Subscription;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.validLogin = true;
  }



  onSubmit(form: NgForm) {
    const credentials = JSON.stringify(form.value); // Donnée user et pass entrées
    this.authService.connectToHost(credentials);
    this.credentialsValidators = this.authService.connectSubject.subscribe( (response) => {
      this.validLogin = response;
      if (this.validLogin)
      {
        console.log(this.validLogin)
        this.router.navigate(['/timeline']);
      } else{
        this.validLogin = false;
      }
    });
    console.log(this.validLogin)
  }
}
