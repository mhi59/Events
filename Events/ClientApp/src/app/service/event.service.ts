import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isDate } from '@angular/common/src/i18n/format_date';

@Injectable()
export class EventService
{

    constructor ( private httpClient: HttpClient ) { }


    sousThemeSubject = new Subject<any[]>();
    eventSubject = new Subject<any[]>();

    private events: Event[] = [];

    private eventsSousTheme = [
        [ 'Arrivée', 'Départ', 'Suivie de mission', 'EAP', 'Entretien candidature' ],
        [ 'Salon', 'Forum', 'Publicité', 'Informations LinkedIn', 'Présentation école' ],
        [ 'Début de mission', 'Fin de mission', 'RDV qualification', 'RDV prospection' ],
        [ 'Afterwork', 'Soirée d\'entreprise' ]
    ]
        ;

    emitsousThemeSubject () // On 'émet' le tableau des sous thèmes
    {
        this.sousThemeSubject.next( this.eventsSousTheme );
    }

    emitEventsSubject () // On 'émet' le tableau des Events   
    {
        this.eventSubject.next( this.events );
    }

    addEvent ( theme: string, sousTheme: string, date: Date, info: string )
    {  // Ajout d'un évènement au tableau events
        const eventObject = {            
            theme: '',
            sousTheme: '',
            date: new Date(),
            info: ''
        };
        eventObject.theme = theme;
        eventObject.sousTheme = sousTheme;
        eventObject.date = date;
        eventObject.info = info;
        this.events.push( eventObject );
        this.emitEventsSubject();
        this.saveEventsToServer();
    }

    getEventsFromServer ()   // Récupération de tous les Events sur le Server
    {
        this.httpClient
            .get<any[]>( 'https://localhost:44320/api/Event' )
            .subscribe(
                ( response ) =>
                {
                    this.events = response;
                    this.emitEventsSubject();
                },
                ( error ) =>
                {
                    console.log( 'Erreur de chargement' );
                }
            );
    }

    saveEventsToServer ()
    { // Sauvegarde du dernier ajout d'Event sur le serveur
        this.httpClient
            .post( 'https://localhost:44320/api/Event', this.events[ this.events.length - 1 ] )
            .subscribe(
                () =>
                {
                    alert( 'Enregistrement terminé' );
                },
                ( error ) =>
                {
                    console.log( 'Erreur de sauvegarde' + error );
                }
            );
    }

    deleteEventOnServer(id: string) {
        this.httpClient
        .delete('https://localhost:44320/api/Event/' + id)
        .subscribe(
            (response) => {
                console.log(response);
            }
        );
        this.emitEventsSubject();
    }
 
}
class Event {      
      theme: string;
      sousTheme: string;
      date: Date;
      info: string;
}
