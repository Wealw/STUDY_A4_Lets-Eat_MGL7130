import {Component, OnInit} from '@angular/core';
import {RestaurantService} from "../../services/restaurant/restaurant.service";
import {Restaurant} from "../../models/Restaurant";
import {Router} from "@angular/router";
import {FilterComponent} from "../filter/filter.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  restaurants : Restaurant[]

  filter: FilterComponent | undefined
  //Google maps option instance : will be used in the future point display system
  mapOptions: google.maps.MapOptions = {
    center: {lat: 45.505423, lng: -73.6594142},
    zoom: 11,
    disableDefaultUI: true,
  }

  constructor(public restaurantService: RestaurantService,
              private router : Router) {
    restaurantService.getAllRestaurants()
  }

  ngOnInit(): void {
  }

  goMenu(idRestaurant : string) {
    this.router.navigate([`restaurant/${idRestaurant}`])
  }
}
