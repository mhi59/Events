import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/';
import { Subscription } from 'rxjs';
import { AuthService } from './service/authService';
import { Router } from '@angular/router';
import { EventViewComponent } from './event-view/event-view.component';
import { Component, Injectable, OnInit, TemplateRef } from '@angular/core';
import { DataService } from './service/dataService';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )

@Injectable()
export class AppComponent implements OnInit
{

  connected = false;
  isConnected: Subscription;

  modalRef: BsModalRef;


  constructor ( private router: Router, private authService: AuthService, private modalService: BsModalService ) { }

  openModal(template: TemplateRef<any>) { // Fenêtre Modal qui gére la supression
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  ngOnInit() 
  {
    this.isConnected = this.authService.connectSubject.subscribe((response) =>
    {
      this.connected = response;
    });
  }

  onEventsInit ()
  {
    this.router.navigateByUrl( '/blank' ).then( () => this.router.navigate( [ '/events' ] ) );

  }

  onLogOut(){
    this.authService.logOut();
  }

  confirm(): void { // Si Confirmation de supression on continue le processus de supression
    this.authService.logOut();
    setTimeout(() => {
      this.modalRef.hide();
      this.router.navigate(['/auth']);
    }, 1000);
  }
}


