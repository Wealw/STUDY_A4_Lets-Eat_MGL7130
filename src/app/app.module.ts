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
import {RestaurantReviewsComponent} from "./components/restaurant-reviews/restaurant-reviews.component";
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
    RestaurantReviewsComponent
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
    ReactiveFormsModule
  ],
  providers:
    [
      RestaurantService
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
