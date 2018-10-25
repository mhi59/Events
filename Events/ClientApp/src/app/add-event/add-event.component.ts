import { EventService } from './../service/event.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Injectable()
@Component( {
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: [ './add-event.component.scss' ]
} )
export class AddEventComponent implements OnInit
{
  options: FormGroup;
  events: any[]; // Tableau des sous thèmes qu'on récupère depuis event.service
  sousTheme: any[] = []; // Tableau des sous-thème en fontion du thème selectionné dans le form
  sousThemeSubscription: Subscription; // Souscription au Subject dans event.service qui renvoi le tableau des events
  themeSelected: string; // Thème sélectionné dans le Select du Form



  constructor ( fb: FormBuilder, private eventService: EventService )
  {
    this.options = fb.group( {
      hideRequired: false,
      floatLabel: 'auto',
    } );
  }

  ngOnInit ()
  {
    this.sousThemeSubscription = this.eventService.sousThemeSubject.subscribe(
      ( events: any[] ) =>
      {
        this.events = events;
      }
    );
    this.eventService.emitsousThemeSubject();
  }


  onSubmit ( form: NgForm ) // Récupération des données du formulaire d'ajout d'un évènement
  {
    const theme = form.value['theme'];
    const sousTheme = form.value['sousTheme'];
    const date = form.value['date'];
    const commentaire = form.value['commentaire'];
  }

  onSousThemeSelected (): any[] // En fonction du choix du Select Thème, on alimente le tableeau des sous-thèmes
  {
    this.sousTheme = [];
    switch ( this.themeSelected )
    {
      case 'rh': {
        for ( const sousTheme of this.events[ 0 ] )
        {
          this.sousTheme.push( sousTheme );
        }
      }
        break;
      case 'marketing': {
        for ( const sousTheme of this.events[ 1 ] )
        {
          this.sousTheme.push( sousTheme );
        }
        break;
      }
      case 'commerce': {
        for ( const sousTheme of this.events[ 2 ] )
        {
          this.sousTheme.push( sousTheme );
        }
        break;
      }
      case 'detente': {
        for ( const sousTheme of this.events[ 3 ] )
        {
          this.sousTheme.push( sousTheme );
        }
        break;
      }
      default: {
        break;
      }
    }
    return this.sousTheme;
  }

}


