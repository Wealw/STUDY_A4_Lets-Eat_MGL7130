import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RestaurantComponent} from "./components/restaurant/restaurant.component";
import {MainComponent} from "./components/main/main.component";

const routes: Routes = [
  {
    path: 'accueil',
    component: MainComponent
  },
  {
    path: 'restaurant/:id',
    component: RestaurantComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'accueil'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
