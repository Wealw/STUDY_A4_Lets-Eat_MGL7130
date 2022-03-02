import { Component, OnInit } from '@angular/core';
import {RestaurantService} from "../../services/restaurant/restaurant.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  areFilterDisplayed = false

  constructor( public restaurantService : RestaurantService) { }

  ngOnInit(): void {
  }

  toggleFilter(){
    this.areFilterDisplayed = ! this.areFilterDisplayed
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  getNumber(event: Event) : number {
    return Number((event.target as HTMLInputElement).value);
  }

}
