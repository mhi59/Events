import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EventService
{

    constructor ( private httpClient: HttpClient ) { }


    sousThemeSubject = new Subject<any[]>();
    eventSubject = new Subject<any[]>();

    private events: any[] = [];

    private eventsSousTheme = [
        [ 'Arrivée', 'Départ', 'Suivie de mission', 'EAP', 'Entretien candidature' ],
        [ 'Salon', 'Forum', 'Publicité', 'Informations LinkedIn', 'Présentation école' ],
        [ 'Début de mission', 'Fin de mission', 'RDV qualification', 'RDV prospection' ],
        [ 'Afterwork', 'Soirée d\'entreprise' ]
    ]
        ;

    emitsousThemeSubject ()
    {
        this.sousThemeSubject.next( this.eventsSousTheme );
    }

    emitEventsSubject() {
        this.eventSubject.next(this.events);
    }

    getEventsFromServer ()
    {
        this.httpClient
            .get<any[]>( 'https://localhost:44320/api/Event' )
            .subscribe(
                ( response ) =>
                {
                    this.events = response;
                    this.emitEventsSubject();
                },
                (error) => {
                    console.log('Erreur de chargement');
                }
            )
    }
}
