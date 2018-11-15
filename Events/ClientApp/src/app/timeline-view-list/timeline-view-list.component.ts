import { Router } from '@angular/router';
import { DataService } from './../service/dataService';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/';
import { Component, OnInit, Input, TemplateRef, Renderer2, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Model } from '../model/model-event';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-timeline-view-list',
  templateUrl: './timeline-view-list.component.html',
  styleUrls: [ './timeline-view-list.component.scss' ],
  encapsulation: ViewEncapsulation.None // Me permet d'appliquer du CSS perso pour la timeline chargée
} )
export class TimelineViewListComponent implements OnInit
{


  @ViewChild( 'timeline' ) // Représente la div présente dans le HTML
  private timeline: ElementRef;

  private _themeActivated = '';
  DisplayedTheme: string;
  jsonEvent: any;

  @Input() events: any[];
  @Input() theme: string;
  @Input() sousTheme: string;
  @Input() date: string;
  @Input() info: string;
  @Input() id: string;
  @Input() index: number;
  @Input() sortedArray: any[];


  modalRef: BsModalRef;
  messageConfirmation = '';
  sortedArraySubscription: Subscription; // Souscription pour récupérer le tableau trié du composant timelineViewComponent une fois qu'il sera chargé

  constructor ( private dataService: DataService, private router: Router, private renderer: Renderer2 ) { }

  ngOnInit ()
  {
    this.sortedArraySubscription = this.dataService.sortedArraySubject.subscribe(
      ( sortedArray: any[] ) =>
      {
        this.sortedArray = sortedArray;
        this.initializeTimeline();
      }
    )
  }

  initializeTimeline ()
  {
    this.jsonEvent = { // On crée l'objet Json qu'on va lier à la timeline
      'scale': 'human',
      'start_date': Date.now(),
      'title': {
        'text': {
          'headline': 'Les Events MICROPOLE'
        }
      },
      'events': [
      ]
    };

    let imageType: string;

    for ( let i = 0, j = 0; i < this.sortedArray.length; i++ ) // On parcours les tableau d'events du tableau sortedArray puis on crée des objets Json à insérer dans jsonEvent
    {
      switch(this.sortedArray[i][0].theme)
      {
        case 'rh': imageType = '../../assets/images/imageRh.png';
        break;
        case 'marketing': imageType = '../../assets/images/imageMarketing.png';
        break;
        case 'commerce': imageType = '../../assets/images/imageCommerce.png';
        break;
        case 'detente': imageType = '../../assets/images/imageDetente.png';
        break;
        default: imageType = '';
      }

      while ( j < this.sortedArray[ i ].length )
      {

        const jsonObject = {
          'media': {
            'url': imageType,
            'thumbnail': imageType
          },
          'start_date': {
            'month': new Date( this.sortedArray[ i ][ j ].date ).getMonth() + 1,
            'day': new Date( this.sortedArray[ i ][ j ].date ).getDate(),
            'year': new Date( this.sortedArray[ i ][ j ].date ).getFullYear()
            
          },
          'text': {
            'headline': this.sortedArray[ i ][ j ].sousTheme,
            'text': this.sortedArray[ i ][ j ].info
          },
          'group': this.sortedArray[ i ][ j ].theme
        };
        this.jsonEvent.events.push( jsonObject ); // On pour l'objet crée dans le tableau events de l'objet jsonEvent
        j++;
      }
      j = 0;
    }
    const timeline_json = JSON.stringify( this.jsonEvent ); // On transforme l'objet jsonEvent en chaîne JSON pour l'exploiter dans le script
    const additionalOptions = '{trackResize: true, zoom_sequence: [1.5, 1.7, 1.9, 2.2, 2.4], default_bg_color: {r:0, g:0, b:0}, language: "fr", timenav_height: 500, optimal_tick_width: 80}';

    const s = this.renderer.createElement( 'script' ); // On crée le script à injecter pour ,instancier  la timeline
    s.type = 'text/javascript';
    s.text = 'timeline = new TL.Timeline(\'timeline-embed\', ' + timeline_json + ', ' + additionalOptions + ');'; // On instancie la timeline avec la chaîne JSON à exploiter
    this.renderer.appendChild( this.timeline.nativeElement, s ); // On injecte le script sur la page  */
  }
}
