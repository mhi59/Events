import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Model } from '../model/model-event';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {

    constructor(protected http: HttpClient) {}

    sousThemeSubject = new Subject<any[]>();

    private eventsSousTheme = [
        [ 'Arrivée', 'Départ', 'Suivie de mission', 'EAP', 'Entretien candidature' ],
        [ 'Salon', 'Forum', 'Publicité', 'Informations LinkedIn', 'Présentation école' ],
        [ 'Début de mission', 'Fin de mission', 'RDV qualification', 'RDV prospection' ],
        [ 'Afterwork', 'Soirée d\'entreprise' ]
    ];


    emitsousThemeSubject () // On 'émet' le tableau des sous thèmes
    {
        this.sousThemeSubject.next( this.eventsSousTheme );
    }



    public getEvents() {
        return this.http.get('https://localhost:44320/api/Event').pipe(
            map(
                (jsonArray: Object[]) => jsonArray.map(jsonItem => Model.fromJson(jsonItem))
            )
        );
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
        // this.events.push( eventObject );
        this.saveEventsToServer(eventObject);
    }

    saveEventsToServer (eventObject: object)
    { // Sauvegarde du dernier ajout d'Event sur le serveur
        this.http
            .post( 'https://localhost:44320/api/Event', eventObject )
            .subscribe(
                () =>
                {
                    console.log( 'Enregistrement terminé' );
                },
                ( error ) =>
                {
                    console.log( 'Erreur de sauvegarde' + error );
                }
            );
    }

    deleteEventOnServer(id: string) {
        this.http
        .delete('https://localhost:44320/api/Event/' + id)
        .subscribe(
            (response) => {
                console.log('Réponse: ' + response);
                this.getEvents();
            }
        );
    }
}
