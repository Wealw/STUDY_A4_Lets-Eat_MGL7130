import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {faSignInAlt, faSign, faUser, faUtensilSpoon} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  faSignInAlt =faSignInAlt ;
  faSign = faSign;
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
