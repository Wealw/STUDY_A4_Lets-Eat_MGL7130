
import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {
  faEllipsisV,
  faBackward,
  faBackspace,
  faFastBackward,
  faHeart,
  faClock,
  faPhone,
  faLocationArrow,
  faPhoneSquare
} from '@fortawesome/free-solid-svg-icons';
import {OptionComponent} from "../option/option.component";
import {RestaurantService} from "../../services/restaurant/restaurant.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Restaurant} from "../../models/Restaurant";

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
  col : any;

  option: OptionComponent | undefined;
  restaurant: Restaurant;

  constructor(private restaurantService: RestaurantService,
              private router: Router,
              private route: ActivatedRoute,) {

  }

  ngOnInit(): void {
    this.col = (window.screen.width <= 667) ? 1 : 2;

    let id = this.route.snapshot.paramMap.get('id');
    this.restaurantService.getOneRestaurant(id).subscribe(res => {
      this.restaurant = res;
      console.log('restaurant -->', res)
    })
  }
  onResize(event : any){
    this.col = (window.screen.width <= 667) ? 1 : 2;


  }

}
