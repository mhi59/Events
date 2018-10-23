import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-view-list',
  templateUrl: './event-view-list.component.html',
  styleUrls: ['./event-view-list.component.scss']
})
export class EventViewListComponent implements OnInit {
  @Input() index: number;
  selected = 'option2';

  constructor() { }

  ngOnInit() {
  }

}
