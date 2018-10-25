import { Subscription } from 'rxjs';
import { EventService } from './../service/event.service';
import { Component, OnInit, Input } from '@angular/core';


export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})

export class EventViewComponent implements OnInit { 

  events: any[];
  eventSubscription: Subscription;
  
  constructor(private eventService: EventService) {
     this.eventService.getEventsFromServer();
   }



  ngOnInit() {
    this.eventSubscription = this.eventService.eventSubject.subscribe(
      (events: any[]) => {
        this.events = events;
      }      
    );
    this.eventService.emitEventsSubject();
  }

}
