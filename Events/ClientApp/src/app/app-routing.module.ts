import { BlankSampleComponent } from './blank-sample/blank-sample.component';
import { UpdateViewComponent } from './update-view/update-view.component';
import { AuthComponent } from './auth/auth.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EventViewComponent } from './event-view/event-view.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventViewListComponent } from './event-view-list/event-view-list.component';
import { TimelineViewComponent } from './timeline-view/timeline-view.component';

const routes: Routes = [
  {path: 'events', component: EventViewComponent},
  {path: 'addEvent', component: AddEventComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'update', component: UpdateViewComponent},
  {path: 'eventView', component: EventViewListComponent},
  {path: 'blank', component: BlankSampleComponent},
  {path: 'timeline', component: TimelineViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
