import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RestaurantComponent} from "./components/restaurant/restaurant.component";
import {MainComponent} from "./components/main/main.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {AboutComponent} from "./components/about/about.component";
import { FavorisComponent } from './components/favoris/favoris.component';
import {AuthGuard} from "@angular/fire/auth-guard";
import {AuthGuardService} from "./services/Authentification/auth-guard.service";
import {EmailComponent} from "./components/reset-password/email/email.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password/reset-password.component";

const routes: Routes = [
  {
    path: '',
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
    path: 'favoris',
    component: FavorisComponent,
    canActivate: [AuthGuardService]

  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'resetPassword',
    component: EmailComponent,
  },
  {
    path: 'auth/email/action',
    component: ResetPasswordComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
