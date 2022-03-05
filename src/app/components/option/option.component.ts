import {Component, OnInit} from '@angular/core';
import {faSignInAlt, faUser, faUtensilSpoon} from '@fortawesome/free-solid-svg-icons';

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

  constructor() {
  }

  ngOnInit(): void {
  }



  toggleOption() {
    this.areOptionOpened = !this.areOptionOpened
  }
}
