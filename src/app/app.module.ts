import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HeaderComponent} from './components/header/header.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {GoogleMapsModule} from '@angular/google-maps';
import {MainComponent} from './components/main/main.component';
import {OptionComponent} from './components/option/option.component';
import {FilterComponent} from './components/filter/filter.component'
import {RestaurantService} from "./services/restaurant/restaurant.service";
import {MenuService} from "./services/restaurant/menu/menu.service";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {RestaurantComponent} from './components/restaurant/restaurant.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    OptionComponent,
    FilterComponent,
    AppComponent,
    RestaurantComponent
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
    FontAwesomeModule
  ],
  providers:
    [
      RestaurantService,
      MenuService
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
