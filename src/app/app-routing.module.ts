import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RestaurantComponent} from "./components/restaurant/restaurant.component";
import {MainComponent} from "./components/main/main.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {AboutComponent} from "./components/about/about.component";

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
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'accueil'
  },
  {
    path: '**',
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
