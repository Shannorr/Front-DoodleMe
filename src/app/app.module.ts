import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule  } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './users/login/login.component';
import { PresentationComponent } from './presentation/presentation.component';
import { AccueilComponent } from './core/accueil/accueil.component';
import {FormsModule} from "@angular/forms";
import { CreerEventComponent } from './core/creer-event/creer-event.component';
import { DetailsEventComponent } from './core/details-event/details-event.component';
import { DetailsUserComponent } from './users/details-user/details-user.component';
import { FavorisEventUserComponent } from './users/favoris-event-user/favoris-event-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PresentationComponent,
    AccueilComponent,
    CreerEventComponent,
    DetailsEventComponent,
    DetailsUserComponent,
    FavorisEventUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
