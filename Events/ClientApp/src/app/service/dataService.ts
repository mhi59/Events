import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Model } from '../model/model-event';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService implements OnInit
{

    constructor ( protected http: HttpClient ) { }

    eventSubject = new Subject<Model[]>(); // Subject qui gerera le tableau d'évènement
    sousThemeSubject = new Subject<any[]>(); // Subject qui gerera le tableau des sous-thèmes
    sortedArraySubject= new Subject<any[]>();
    private eventsArray: Model[] = []; // Tableau des évènements
    private eventsArrayAfterDelete: Model[] = []; // Tableau des évènements après supression pour rester sur une page avec le thème en cours
    isThemeActivated = false; // Vérifié si on est sur un thème en particulier après supression pour charger le tableau correspondant

    eventSubscription: Subscription; // Récupère le résultat de la requête de getEvents()

    private eventsSousTheme = [
        [ 'Arrivée', 'Départ', 'Suivie de mission', 'EAP', 'Entretien candidature' ],
        [ 'Salon', 'Forum', 'Publicité', 'Informations LinkedIn', 'Présentation école' ],
        [ 'Début de mission', 'Fin de mission', 'RDV qualification', 'RDV prospection' ],
        [ 'Afterwork', 'Soirée d\'entreprise' ]
    ];

    // Permet de souscrire à l'observable getEvents() et de récupérer le résultat de la requête
    ngOnInit() {}

    InitializeEvents() {
        this.eventSubscription = this.getEvents().subscribe(
            (response) => {
                this.eventsArray = response;
                this.emitEventSubject();
            }
        );
    }

    emitEventSubject() { // On 'émet' une copie le tableau des events ou des events après supression

    if(this.isThemeActivated)
    {
        this.eventSubject.next(this.eventsArrayAfterDelete.slice());
        this.isThemeActivated = false;
    } else
    {
        console.log('else')
        this.eventSubject.next(this.eventsArray.slice());
    }        
    }

    emitsousThemeSubject () // On 'émet' une copie le tableau des sous thèmes
    {
        this.sousThemeSubject.next( this.eventsSousTheme.slice());
    }

    emitSortedArraySubject(sortedArray: any[])
    {
        this.sortedArraySubject.next(sortedArray.slice());
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
        this.saveEventsToServer( eventObject );
    }

    public getEvents()
    {        
        return this.http.get( 'https://localhost:44320/api/Event' ).pipe(
            map(( jsonArray: any[] ) => jsonArray.map( jsonItem => Model.fromJson( jsonItem ), // On Transforme l'objet reçu en objet de type Model
            jsonArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // On trie les dates par ordre descendant
            )            
        ));
    }

    updateEvent ( id: string, theme: string, sousTheme: string, date: Date, info: string ) // Préparation d'un objet pour mis à jour d'un Event
    {
        const eventObject = {
            theme: '',
            sousTheme: '',
            date: new Date,
            info: ''
        };

        eventObject.theme = theme;
        eventObject.sousTheme = sousTheme;
        eventObject.date = date;
        eventObject.info = info;

        this.updateEventOnServer( eventObject, id );
    }

    saveEventsToServer ( eventObject: object )
    { // Sauvegarde du dernier ajout d'Event sur le serveur
        this.http
            .post( 'https://localhost:44320/api/Event', eventObject )
            .subscribe(
                () =>
                {
                    this.InitializeEvents();
                    console.log( 'Enregistrement terminé' );
                },
                ( error ) =>
                {
                    console.log( 'Erreur de sauvegarde' + error );
                }
            );
    }

    deleteEventOnServer ( id: string, theme: string ) // Supression d'un Event
    {
        if(theme !== undefined && theme !== '' && theme !== null)
        {
            this.isThemeActivated = true;
        } else{
            this.isThemeActivated = false;
        }

        this.http
            .delete( 'https://localhost:44320/api/Event/' + id)
            .subscribe(
                ( response ) =>
                {
                    const filter1 = this.eventsArray.filter((event) => { // Ce tableau contiendra les Events du même thème sauf l'Event supprimé
                        return event.id !== id && event.theme === theme;
                    });
                    const filter2 = this.eventsArray.filter((event) => { // Ce tableau contiendra tous les Events sauf celui supprimé
                        return event.id !== id;
                    });
                    this.eventsArrayAfterDelete = filter1;
                    this.eventsArray = filter2;
                    this.emitEventSubject();
                }
            );
    }

    updateEventOnServer ( eventObject: Object, id: string ) // Mis à jour un Event
    {
        this.http.put( 'https://localhost:44320/api/Event/' + id, eventObject )
        .subscribe(
            () => 
            {
                this.InitializeEvents();

                console.log('update terminé');
            },
            (error) => 
            {
                console.log('Erreur de sauvegarde' + error);
            }
            );
    }
}
