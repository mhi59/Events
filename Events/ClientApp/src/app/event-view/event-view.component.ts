import { Subscription } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../service/dataService';
import { Model } from '../model/model-event';



@Component( {
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: [ './event-view.component.scss' ]
} )

export class EventViewComponent implements OnInit {

  public events: Model[];
  eventSubscription: Subscription;

constructor(private data: DataService) {}

ngOnInit() {
  this.eventSubscription = this.data.getEvents().subscribe(
    (events) => this.events = events
  );
}

onFetch()
{
  this.data.getEvents().subscribe(
    (events) => this.events = events
  );
}

ngOnDestroy() {
  this.eventSubscription.unsubscribe();
}

}
