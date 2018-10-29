import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../service/dataService';


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


  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }

  onDeleteEvent() {
    this.dataService.deleteEventOnServer(this.id);    
  }
 

}


