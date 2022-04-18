import {Component, Input, OnInit} from '@angular/core';
import {RestaurantService} from "../../services/restaurant/restaurant.service";
import {Recherche} from "../../models/Recherche";
import {HeaderComponent} from "../header/header.component";
import {MainComponent} from "../main/main.component";
import {InternetService} from "../../services/internet/internet.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  restaurantRecherche: Recherche;
  refresh = true
  @Input() delegate: HeaderComponent;

  constructor(public restaurantService: RestaurantService, private internet : InternetService) {
    this.restaurantRecherche = restaurantService.recherche
  }

  ngOnInit(): void {

  }

  formatLabel(value: number) {
    return value;
  }

  handleForm() {
    this.internet.checkInternet()
    this.restaurantService.getAllRestaurants()
    if (this.delegate != undefined) {
      this.delegate.toggleFilter()
    }
    return false
  }

  resetSearch(){
    this.restaurantService.recherche.reset()
    this.restaurantService.getAllRestaurants()
    if (this.delegate != undefined) {
      this.delegate.areFilterInUse = this.restaurantService.recherche.checkIfFilterAreInUse();
    }
    this.refresh = false
    setTimeout(()=> {
      this.refresh = true
    }, 0)
  }
}
