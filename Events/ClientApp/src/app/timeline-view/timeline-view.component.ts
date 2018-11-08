import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Model } from './../model/model-event';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from './../service/dataService';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.scss']
})
export class TimelineViewComponent implements OnInit {
  public events: Model[]; // Tableau des évènements qu'on récupère depuis le service
  private arrayTampon: Model[]; // Permet de garder une copie du tableau d'events en cas de manipulation
  eventSubscription: Subscription; // Souscription au Subject eventSubject du dataService qui renvoie le tableau d'events

  eventsSousTheme: any[]; // Tableau des sous thèmes qu'on récupère depuis event.service
  sousTheme: any[] = []; // Tableau des sous-thème en fontion du thème selectionné dans le form
  sousThemeSubscription: Subscription; // Souscription au Subject dans event.service qui renvoi le tableau des sous-thèmes
  themeSelected: string; // Thème selectionné dans le Select Thème permetant de choisir quel sous-thèmes afficher
  DisplayedTheme: string; // Thème affiché dans le h1

  themeFiltered: string; // Contiendra le thème selectionné dna le Select correspondant
  sousThemeFiltered: string; // Contiendra le sous-thème selectionné dans le Select correspondant
  startDateFiltered: Date; // Contiendra date de début pour le filtre
  endDateFiltered: Date; // Contiendra date de fin pour le filtre

  filters: any; // Filtre du tableau d'events
  
  rhArray: any[] = [];
  marketingArray: any[] = [];
  commerceArray: any[] = [];
  detenteArray: any[] = [];
  sortedArray: any[] = [];
  
  constructor ( private dataService: DataService, private router: Router, private _formBuilder: FormBuilder ) {}

  ngOnInit ()
  {
    this.dataService.InitializeEvents(); // Lancement de InitializeEvents du DataService pour initialiser le tableau d'events
    this.eventSubscription = this.dataService.eventSubject.subscribe(
      ( events ) =>
      {
        this.events = events;
        this.arrayTampon = events;
        this.sortArray();
      },
      (error) => {
        console.log('Erreur' + error);
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

  sortArray() {  // Trie du tableau des events que je classe dans différents tableaux en fonction du thème puis que je regroupe dans un tableau trié
    for (const event of this.events)
     {
        switch (event.theme) 
        {
          case 'rh': this.rhArray.push(event);
          break;
          case 'commerce': this.commerceArray.push(event);
          break;
          case 'marketing': this.marketingArray.push(event);
          break;
          case 'detente': this.detenteArray.push(event);
          break;
          default: break;
        }
     }
     if (this.rhArray.length > 0)  {this.sortedArray.push(this.rhArray); }
     if (this.commerceArray.length > 0)  {this.sortedArray.push(this.commerceArray); }
     if (this.marketingArray.length > 0)  {this.sortedArray.push(this.marketingArray); }
     if (this.detenteArray.length > 0)  {this.sortedArray.push(this.detenteArray); }
  }

  onFetch ()
  {
    this.themeSelected = '';
    this.startDateFiltered = undefined;
    this.endDateFiltered = undefined;
    this.DisplayedTheme = '';
    this.dataService.emitEventSubject();
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

      switch(value) {
        case 'rh': this.DisplayedTheme = 'RH';
                   break;
        case 'marketing': this.DisplayedTheme = 'Marketing';
                    break;
        case 'commerce': this.DisplayedTheme = 'Commerce';
                    break;
        case 'detente': this.DisplayedTheme = 'Détente';
                    break;
        default: this.DisplayedTheme = '';
                     break;
      }
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
