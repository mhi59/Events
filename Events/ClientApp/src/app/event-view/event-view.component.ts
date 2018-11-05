import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../service/dataService';
import { Model } from '../model/model-event';
import { map, filter } from 'rxjs/operators';
import { from } from 'rxjs';






@Component( {
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: [ './event-view.component.scss' ]
} )

export class EventViewComponent implements OnInit
{

  public events: Model[]; // Tableau des évènements qu'on récupère depuis le service
  private arrayTampon: Model[]; // Permet de garder une copie du tableau d'events en cas de manipulation
  eventSubscription: Subscription; // Souscription au Subject eventSubject du dataService qui renvoie le tableau d'events

  eventsSousTheme: any[]; // Tableau des sous thèmes qu'on récupère depuis event.service
  sousTheme: any[] = []; // Tableau des sous-thème en fontion du thème selectionné dans le form
  sousThemeSubscription: Subscription; // Souscription au Subject dans event.service qui renvoi le tableau des sous-thèmes
  themeSelected: string; // Thème selectionné dans le Select Thème permetant de choisir quel sous-thèmes afficher

  themeFiltered: string; // Contiendra le thème selectionné dna le Select correspondant
  sousThemeFiltered: string; // Contiendra le sous-thème selectionné dans le Select correspondant
  startDateFiltered: Date; // Contiendra date de début pour le filtre
  endDateFiltered: Date; // Contiendra date de fin pour le filtre

  filters: any; // Filtre du tableau d'events

  constructor ( private dataService: DataService ) {}

  ngOnInit ()
  {
    this.dataService.InitializeEvents(); // Lancement de InitializeEvents du DataService pour initialiser le tableau d'events
    this.eventSubscription = this.dataService.eventSubject.subscribe(
      ( events ) =>
      {
        this.events = events;
        this.arrayTampon = events;
      },
      (error) => {
        console.log('rien reçu')
      }
  );

    this.sousThemeSubscription = this.dataService.sousThemeSubject.subscribe(
      ( eventsSousTheme: any[] ) =>
      {
        this.eventsSousTheme = eventsSousTheme;
      }
    );
    this.dataService.emitsousThemeSubject();
  }


  onFetch ()
  {
    this.dataService.emitEventSubject();
    this.themeSelected = '';
    this.startDateFiltered = undefined;
    this.endDateFiltered = undefined;
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

  getColor (): string
  {
    switch ( this.themeSelected )
    {
      case 'rh': return 'rgb(92, 79, 156)';
      case 'marketing': return 'rgb(59, 136, 168)';
      case 'commerce': return 'rgb(211, 7, 119)';
      case 'detente': return 'rgb(118, 4, 66)';
    }
  }

  onThemeChange ( value: string )
  {
    this.events = this.arrayTampon; // On réinitialise le tableau events à l'original
    this.themeFiltered = value; // Récupération du thème selectionné à partir du Select Theme
    this.filters = { // Ici on ne filtre que le thème
      theme: [ this.themeFiltered ]
    }

 
      this.events = this.eventsMultiFilter( this.events, this.filters ); // On appelle la méthode de filtre
    
  
  }

  onSousThemeChange ( value: string )
  {
    this.events = this.arrayTampon; // On réinitialise le tableau events à l'original
    this.sousThemeFiltered = value; // Récupération du sous-thème selectionné à partir du Select sous-thème

    this.filters = { // Ici on filtre la le thème et le sous-thème
      theme: [this.themeFiltered],
      sousTheme: [this.sousThemeFiltered]
    }
    this.events = this.eventsMultiFilter( this.events, this.filters ); // On appelle la méthode de filtre
    

  
  }

  onChangeDate() {   // Filtrage en fonction des dates

    this.events = this.arrayTampon; // On initialise le tableau à l'entrée
    if(this.themeFiltered !== '' && this.themeFiltered !== null && this.themeFiltered !== undefined) // Si pas de thème indiqué on ne filtre pas selon le thème
    {
      console.log('ici')
    this.onThemeChange(this.themeFiltered);
    }

    if (this.startDateFiltered !== undefined && this.endDateFiltered !== undefined) // Si startDate et endDate renseigné
    {
      this.events = this.events.filter((item: Model) =>
      {      
        return new Date(item.date).getTime() >= new Date(this.startDateFiltered).getTime() &&
               new Date(item.date).getTime() <= new Date(this.endDateFiltered).getTime();
      } );
    } else if (this.startDateFiltered === undefined && this.endDateFiltered !== undefined) // si que endDate renseigné
    {
      this.events = this.events.filter((item: Model) =>
      {      
        return new Date(item.date).getTime() <= new Date(this.endDateFiltered).getTime();
      } );
    } else if (this.startDateFiltered !== undefined && this.endDateFiltered === undefined) // si que startDate renseigné
    {
      this.events = this.events.filter((item: Model) =>
      {      
        return new Date(item.date).getTime() >= new Date(this.startDateFiltered).getTime();
      } );
      
    }    
  }

  eventsMultiFilter ( eventArray: Model[], filters: any ) // Filtre multicritères
  {

    const filterKeys = Object.keys( filters );

    return eventArray.filter( ( event ) =>
    {
      return filterKeys.every( key => !!~filters[ key ].indexOf( event[ key ] ) );
    } );
  }

  ngOnDestroy ()
  {
    this.eventSubscription.unsubscribe(); // On détruit la souscription à la destruction du composant
  }

}
