import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { EventViewComponent } from './event-view/event-view.component';
import { EventViewListComponent } from './event-view-list/event-view-list.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { AddEventComponent } from './add-event/add-event.component';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    EventViewComponent,
    EventViewListComponent,
    AddEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [MatButtonModule,
            MatCheckboxModule,
            MatSelectModule,
            MatDatepickerModule
          ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
