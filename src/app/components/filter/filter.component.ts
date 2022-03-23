import {Component, Input, OnInit} from '@angular/core';
import {RestaurantService} from "../../services/restaurant/restaurant.service";
import {Recherche} from "../../models/Recherche";
import {HeaderComponent} from "../header/header.component";
import {MainComponent} from "../main/main.component";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  restaurantRecherche: Recherche;

  @Input() delegate: HeaderComponent;

  constructor(public restaurantService: RestaurantService, private main : MainComponent) {
    this.restaurantRecherche = restaurantService.recherche;
  }

  ngOnInit(): void {
    this.restaurantRecherche.distance = 20;
  }

  formatLabel(value: number) {
    return value;
  }

  handleForm() {
    this.main.chechInternet()
    this.restaurantService.getAllRestaurants()
    if (this.delegate != undefined) {
      this.delegate.toggleFilter()
    }
  }


}
