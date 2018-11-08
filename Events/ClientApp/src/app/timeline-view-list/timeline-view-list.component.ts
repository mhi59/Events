import { Router } from '@angular/router';
import { DataService } from './../service/dataService';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/';
import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-timeline-view-list',
  templateUrl: './timeline-view-list.component.html',
  styleUrls: ['./timeline-view-list.component.scss']
})
export class TimelineViewListComponent implements OnInit {

  private _themeActivated = '';
  DisplayedTheme: string;

  @Input() events: any[];
  @Input() theme: string;
  @Input() sousTheme: string;
  @Input() date: string;
  @Input() info: string;
  @Input() id: string;
  @Input() index: number;
  @Input() sortedArray: any[];

  @Input() set themeActivated(theme: string) {  // On reçoit le themeSelected du composant parent eventViewComponent
    this._themeActivated = theme;
  }
  get themeActivated(): string {return this._themeActivated; }

  

  modalRef: BsModalRef;
  messageConfirmation = '';



  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    const jsonEvent = {
      'title': {
        'text': { 
          'headline': 'Les Events ' + this.sortedArray[0].theme.toUpperCase(),
        }
      },
      'events': [
        
      ]
    }

    for(const event of this.sortedArray) {
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
      jsonEvent.events.push(jsonObject);     
    }

    console.log(jsonEvent)


  }
}
