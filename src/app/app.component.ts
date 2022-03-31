import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthGuardService} from "./services/Authentification/auth-guard.service";
import {MessagingService} from "./services/messaging/messaging.service";
import {BehaviorSubject} from "rxjs";

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
  message : BehaviorSubject<any>;

  constructor(private router: Router, private auth : AuthGuardService, private messagingService: MessagingService) {
  }

  ngOnInit() {
    this.auth.checkAuthentification();
    this.messagingService.requestPermission();
    this.messagingService.listen();
    //this.messagingService.requestPermission()
    //this.messagingService.receiveMessage()
    //this.message = this.messagingService.currentMessage
  }

}
