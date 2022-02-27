
import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { faEllipsisV, faBackward, faBackspace, faFastBackward, faHeart, faClock, faPhone, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import {OptionComponent} from "../option/option.component";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  @ViewChildren(OptionComponent) options: QueryList<OptionComponent>
 
  displayBackButton = false
  faEllipsisV = faEllipsisV
  faBackward= faBackward
  faBackspace =faBackspace
  faFastBackward = faFastBackward
  faHeart = faHeart
  faClock =faClock
  faPhone =faPhone
  faLocationArrow = faLocationArrow
  
 
  option: OptionComponent | undefined;
 

  constructor() { }

  ngOnInit(): void {
  }

}
