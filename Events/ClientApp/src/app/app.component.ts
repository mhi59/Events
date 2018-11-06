import { Router } from '@angular/router';
import { EventViewComponent } from './event-view/event-view.component';
import { Component, Injectable } from '@angular/core';
import { DataService } from './service/dataService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

@Injectable()
export class AppComponent {

constructor(private router: Router) {}

  onEventsInit() {
    this.router.navigateByUrl('/blank').then(() => this.router.navigate(['/events']));
  }
}
