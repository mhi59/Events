import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { DataService } from './../service/dataService';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-view',
  templateUrl: './update-view.component.html',
  styleUrls: ['./update-view.component.scss']
})
export class UpdateViewComponent implements OnInit {

  idParams: string;
  themeParams: string;
  sousThemeParams: string;
  dateParams: Date;
  infoParams: string;

  sousThemeArray: any[] = []; // Tableau des sous-thème en fontion du thème selectionné dans le form
  themeSelected = this.sousThemeParams; // Thème sélectionné dans le Select du Form
  events: any[]; // Tableau des sous thèmes qu'on récupère depuis event.service
  sousThemeSubscription: Subscription; // Souscription au Subject dans event.service qui renvoi le tableau des events
  options: FormGroup;

  constructor(fb: FormBuilder, private router: Router, private routeActive: ActivatedRoute, private dataService: DataService) { 
    this.options = fb.group( {
      hideRequired: false,
      floatLabel: 'auto',
    } );
  }

  onSubmit(form: NgForm) {
    const theme = form.value['theme'];
    const sousTheme = form.value['sousTheme'];
    const date = form.value['date'];
    const info = form.value['info'];
    this.dataService.updateEvent(this.idParams, theme, sousTheme, date, info);
    this.router.navigate(['/events']);
  }

  
  onSousThemeSelected (): any[] // En fonction du choix du Select Thème, on alimente le tableeau des sous-thèmes
  {
    this.sousThemeArray = [];
    switch ( this.themeParams )
    {
      case 'rh': {
        for ( const sousTheme of this.events[ 0 ] )
        {
          this.sousThemeArray.push( sousTheme );
        }
      }
        break;
      case 'marketing': {
        for ( const sousTheme of this.events[ 1 ] )
        {
          this.sousThemeArray.push( sousTheme );
        }
        break;
      }
      case 'commerce': {
        for ( const sousTheme of this.events[ 2 ] )
        {
          this.sousThemeArray.push( sousTheme );
        }
        break;
      }
      case 'detente': {
        for ( const sousTheme of this.events[ 3 ] )
        {
          this.sousThemeArray.push( sousTheme );
        }
        break;
      }
      default: {
        break;
      }
    }
    return this.sousThemeArray;
  }


  ngOnInit() {
    this.idParams = this.routeActive.snapshot.queryParams['id'];
    this.themeParams = this.routeActive.snapshot.queryParams['theme'];
    this.sousThemeParams = this.routeActive.snapshot.queryParams['sousTheme'];
    this.dateParams = this.routeActive.snapshot.queryParams['date'];
    this.infoParams = this.routeActive.snapshot.queryParams['info'];

    this.sousThemeSubscription = this.dataService.sousThemeSubject.subscribe(
      ( events: any[] ) =>
      {
        this.events = events;
      }
    );
    this.dataService.emitsousThemeSubject();
    
  }

}
