import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthGuardService} from "./services/Authentification/auth-guard.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [`
    agm-map {
      height: 300px;
    }
  `],
})
export class AppComponent implements OnInit {
  title = 'Lets-Eat';

  constructor(private router: Router, private auth : AuthGuardService) {
  }

  ngOnInit() {
    this.auth.checkAuthentification();
  }

}
