import {Component, OnInit} from '@angular/core';
import {faSignInAlt, faUser, faUtensilSpoon} from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {
  faSignInAlt =faSignInAlt ;
  faUser = faUser;
  faUtensilSpoon = faUtensilSpoon;
  areOptionOpened = false

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  // Bascule l'état d'affichage du menu d'option
  toggleOption() {
    this.areOptionOpened = !this.areOptionOpened
  }

  // Permet de revenir à l'écran d'accueil
  navigateToSignIn() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([`sign-in`])
  }

  navigateToSignUp() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([`sign-up`])
  }

  navigateToAbout() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([`about`])
  }
}
