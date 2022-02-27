import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HeaderComponent} from './header/header.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {GoogleMapsModule} from '@angular/google-maps';
import { MainComponent } from './main/main.component';
import { OptionComponent } from './option/option.component';
import { FilterComponent } from './filter/filter.component'
import {RestaurantDetailsComponent} from "./restaurant-details/restaurant-details.component";
import { RestaurantReviewsComponent } from './restaurant-reviews/restaurant-reviews.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    OptionComponent,
    FilterComponent,
    RestaurantDetailsComponent,
    RestaurantReviewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
