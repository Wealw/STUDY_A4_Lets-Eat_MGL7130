import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

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

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

}
