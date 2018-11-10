import { Router } from '@angular/router';
import { DataService } from './../service/dataService';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/';
import { Component, OnInit, Input, TemplateRef, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Model } from '../model/model-event';

@Component({
  selector: 'app-timeline-view-list',
  templateUrl: './timeline-view-list.component.html',
  styleUrls: ['./timeline-view-list.component.scss']
})
export class TimelineViewListComponent implements OnInit {


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
  @Input() sortedArrayy: any[];


  modalRef: BsModalRef;
  messageConfirmation = '';

  constructor(private dataService: DataService, private router: Router, private renderer: Renderer2) { }

  ngOnInit() {
  /*  this.jsonEvent = {
      'title': {
        'text': { 
          'headline': 'Les Events ' + this.sortedArray[0].theme.toUpperCase(),
        }
      },
      'events': [
      ]
    };
*/setTimeout(() => {
  console.log(this.sortedArrayy.length)
  console.log(this.sortedArrayy)
}, 3000);
    
    /*for (let i = 0, j = 0; i < this.sortedArrayy.length; i++)
    {
      while (j < this.sortedArrayy[i].length)
      {
        console.log(this.sortedArrayy[i][j]);
        j++;
      }
    }

  /*  for(const event of this.sortedArray) {
      const jsonObject = {
        'start_date': {
          'month': new Date(event.date).getMonth(),
          'day': new Date(event.date).getDay(),
          'year': new Date(event.date).getFullYear()
        },
        'text': {
          'headline': event.sousTheme,
          'text': event.info
        }
      };
      this.jsonEvent.events.push(jsonObject); // On pour l'objet crée dans le tableau events de l'objet jsonEvent
    }

    const timeline_json = JSON.stringify(this.jsonEvent); // On transforme l'objet jsonEvent en chaîne JSON pour l'exploiter dans le script

      const s = this.renderer.createElement('script'); // On crée le script à injecter pour ,instancier  la timeline
      s.type = 'text/javascript';
      s.text = 'timeline = new TL.Timeline(\'timeline-embed\', ' + timeline_json + ');'; // On instancie la timeline avec la chaîne JSON à exploiter
      this.renderer.appendChild(this.timeline.nativeElement, s); // On injecte le script sur la page  */
  }
}
