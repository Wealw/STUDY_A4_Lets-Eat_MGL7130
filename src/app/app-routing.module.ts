import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {RestaurantComponent} from "./components/restaurant/restaurant.component";
import {MainComponent} from "./components/main/main.component";

const routes: Routes = [
  {
    path: 'acceuil',
    component: MainComponent
  },
  {
    path: 'restaurant/:id',
    component: RestaurantComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'acceuil'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
