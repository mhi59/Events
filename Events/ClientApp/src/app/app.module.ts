import { Authentication } from './service/authentication';
import { AuthGuard } from './service/authGuard';
import { AuthService } from './service/authService';
import { TimelineViewListComponent } from './timeline-view-list/timeline-view-list.component';
import { TimelineViewComponent } from './timeline-view/timeline-view.component';
import { DataService } from './service/dataService';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MAT_DATE_LOCALE} from '@angular/material';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { MomentModule } from 'ngx-moment';
import {MatDialogModule} from '@angular/material/dialog';
import { UpdateViewComponent } from './update-view/update-view.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BlankSampleComponent } from './blank-sample/blank-sample.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import {MatStepperModule} from '@angular/material/stepper';
import { DxLinearGaugeModule } from 'devextreme-angular';
import { JwtModule } from '@auth0/angular-jwt';
import { TokenInterceptor } from './service/tokenInterceptor';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}



registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    EventViewComponent,
    EventViewListComponent,
    AddEventComponent,
    AuthComponent,
    UpdateViewComponent,
    BlankSampleComponent,
    TimelineViewComponent,
    TimelineViewListComponent
   
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
    HttpClientModule,
    MomentModule,
    MatDialogModule,
    ModalModule.forRoot(),
    BsDropdownModule,
    AccordionModule,
    TabsModule,
    ProgressbarModule,
    MatStepperModule,
    DxLinearGaugeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('jwt');
        },
        whitelistedDomains: ['localhost:44320']
      }
    })
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    { provide: LOCALE_ID, useValue: 'fr' },
    DataService,
    AuthService,
    AuthGuard,
    Authentication,
    {provide: HTTP_INTERCEPTORS,
     useClass: TokenInterceptor,
     multi: true
    }
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
