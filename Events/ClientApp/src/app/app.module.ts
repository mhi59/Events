import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
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
import { AuthComponent } from './auth/auth.component';
import {MatIconModule} from '@angular/material/icon';
import { EventService } from './service/event.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    EventViewComponent,
    EventViewListComponent,
    AddEventComponent,
    AuthComponent
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
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [
    EventService
  ],
  bootstrap: [AppComponent],
  exports: [MatButtonModule,
            MatCheckboxModule,
            MatSelectModule,
            MatDatepickerModule
          ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
