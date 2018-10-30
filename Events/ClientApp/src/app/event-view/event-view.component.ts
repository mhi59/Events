import { Subscription } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../service/dataService';
import { Model } from '../model/model-event';




@Component( {
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: [ './event-view.component.scss' ]
} )

export class EventViewComponent implements OnInit {

  public events: Model[];
  eventSubscription: Subscription;

  eventsSousTheme: any[]; // Tableau des sous thèmes qu'on récupère depuis event.service
  sousTheme: any[] = []; // Tableau des sous-thème en fontion du thème selectionné dans le form
  sousThemeSubscription: Subscription; // Souscription au Subject dans event.service qui renvoi le tableau des events
  themeSelected: string; // Thème sélectionné dans le Select du Form


constructor(private dataService: DataService) {}

ngOnInit() {
  
  this.eventSubscription = this.dataService.getEvents().subscribe(
    (events) => this.events = events
  );

  this.sousThemeSubscription = this.dataService.sousThemeSubject.subscribe(
    ( eventsSousTheme: any[] ) =>
    {
      this.eventsSousTheme = eventsSousTheme;
    }
  );
  this.dataService.emitsousThemeSubject();
  
}

onFetch()
{
  this.dataService.getEvents().subscribe(
    (events) => this.events = events
  );
}

onSousThemeSelected (): any[] // En fonction du choix du Select Thème, on alimente le tableeau des sous-thèmes
  {
    this.sousTheme = [];
    switch ( this.themeSelected )
    {
      case 'rh': {
        for ( const sousTheme of this.eventsSousTheme[ 0 ] )
        {
          this.sousTheme.push( sousTheme );
        }
      }
        break;
      case 'marketing': {
        for ( const sousTheme of this.eventsSousTheme[ 1 ] )
        {
          this.sousTheme.push( sousTheme );
        }
        break;
      }
      case 'commerce': {
        for ( const sousTheme of this.eventsSousTheme[ 2 ] )
        {
          this.sousTheme.push( sousTheme );
        }
        break;
      }
      case 'detente': {
        for ( const sousTheme of this.eventsSousTheme[ 3 ] )
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






ngOnDestroy() {
  this.eventSubscription.unsubscribe();
}

}
