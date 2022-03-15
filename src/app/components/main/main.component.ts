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
  restaurants: Restaurant[]
  filter: FilterComponent | undefined
  mapOptions: google.maps.MapOptions = {
    center: {lat: 45.505423, lng: -73.6594142},
    zoom: 11,
    disableDefaultUI: true,
  }
  icon = {
    url: "assets/icons/icon.svg",
    scaledSize: new google.maps.Size(50, 50)
  }

  constructor(public restaurantService: RestaurantService,
              private router: Router) {
    restaurantService.getAllRestaurants()
  }

  ngOnInit(): void {
  }

  // Permet de naviguer jusqu'à restaurant donné
  goMenu(idRestaurant: string) {
    this.router.navigate([`restaurant/${idRestaurant}`])
  }

}
