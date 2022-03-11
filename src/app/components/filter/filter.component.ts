import {Component, OnInit} from '@angular/core';
import {RestaurantService} from "../../services/restaurant/restaurant.service";
import {Recherche} from "../../models/Recherche";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  restaurantRecherche: Recherche;
  categories: any[] = [{name: 'Pizzeria', value: 'pizzeria'}, {name: 'Fast Food', value: 'fastfood'}, {
    name: 'Coffee',
    value: 'coffee'
  }]

  constructor(public restaurantService: RestaurantService,
  ) {
    this.restaurantRecherche = restaurantService.recherche;
  }

  ngOnInit(): void {
    this.restaurantRecherche.distance = 20;
    // this.initForm()

  }

  formatLabel(value: number) {
    return value;
  }


}
