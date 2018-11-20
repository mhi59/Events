import { AuthGuard } from './service/authGuard';
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
  {path: 'events', canActivate: [AuthGuard], component: EventViewComponent},
  {path: 'addEvent', canActivate: [AuthGuard], component: AddEventComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'update', canActivate: [AuthGuard], component: UpdateViewComponent},
  {path: 'eventView', canActivate: [AuthGuard], component: EventViewListComponent},
  {path: 'blank', canActivate: [AuthGuard], component: BlankSampleComponent},
  {path: 'timeline', canActivate: [AuthGuard], component: TimelineViewComponent},
  {path: '', redirectTo: 'auth', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
