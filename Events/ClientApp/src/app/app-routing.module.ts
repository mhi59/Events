import { AuthComponent } from './auth/auth.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EventViewComponent } from './event-view/event-view.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'events', component: EventViewComponent},
  {path: 'addEvent', component: AddEventComponent},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
