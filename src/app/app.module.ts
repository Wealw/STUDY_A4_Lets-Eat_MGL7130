import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HeaderComponent} from './components/header/header.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {GoogleMapsModule} from '@angular/google-maps';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainComponent} from './components/main/main.component';
import {OptionComponent} from './components/option/option.component';
import {FilterComponent} from './components/filter/filter.component'
import {RestaurantService} from "./services/restaurant/restaurant.service";
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {RestaurantComponent} from './components/restaurant/restaurant.component';
import {RestaurantDetailsComponent} from "./components/restaurant-details/restaurant-details.component";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonModule} from "@angular/material/button";
import {NgxStarRatingModule} from "ngx-star-rating";
import {MatListModule} from "@angular/material/list";
import { ArticleComponent } from './components/article/article.component';
import {MatDialogModule} from "@angular/material/dialog";
import {AutosizeModule} from "ngx-autosize";
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AboutComponent } from './components/about/about.component';
import {MatBadgeModule} from "@angular/material/badge";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    OptionComponent,
    FilterComponent,
    AppComponent,
    RestaurantComponent,
    FilterComponent,
    RestaurantComponent,
    RestaurantDetailsComponent,
    ArticleComponent,
    SignInComponent,
    SignUpComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatSliderModule,
    MatButtonModule,
    NgxStarRatingModule,
    MatListModule,
    ReactiveFormsModule,
    MatDialogModule,
    AutosizeModule,
    MatBadgeModule
  ],
  providers:
    [
      RestaurantService
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
