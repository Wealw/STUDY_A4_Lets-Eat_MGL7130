import {Component,NgModule} from '@angular/core';


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
export class AppComponent {
  title = 'Lets-Eat';
}



