import { Router } from '@angular/router';
import { EventService } from './../service/event.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-event-view-list',
  templateUrl: './event-view-list.component.html',
  styleUrls: ['./event-view-list.component.scss']
})
export class EventViewListComponent implements OnInit {
  @Input() theme: string;
  @Input() sousTheme: string;
  @Input() date: string;
  @Input() info: string;
  @Input() id: string;
  @Input() index: number;
  test: string;


  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
  }

  onDeleteEvent() {
    this.eventService.deleteEventOnServer(this.id);
    this.eventService.emitEventsSubject();
    this.router.navigate(['/events']);
  }
 

}


