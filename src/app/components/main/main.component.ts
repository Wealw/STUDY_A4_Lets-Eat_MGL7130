import {Component, OnInit} from '@angular/core';
import {RestaurantService} from "../../services/restaurant/restaurant.service";
import {Restaurant} from "../../models/Restaurant";
import {Router} from "@angular/router";
import {FilterComponent} from "../filter/filter.component";
import {MatDialog} from "@angular/material/dialog";
import {ErrorComponent} from "../error/error.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  restaurants: Restaurant[]
  filter: FilterComponent | undefined
  mapOptions: google.maps.MapOptions = {
    center: {lat: 0, lng: -0},
    zoom: 11,
    disableDefaultUI: true,
  }
  icon = {
    url: "assets/icons/icon.svg",
    scaledSize: new google.maps.Size(50, 50)
  }
  tab : number[] = new Array(5);

  constructor(public restaurantService: RestaurantService,
              private router: Router,
              private dialog: MatDialog) {
    restaurantService.getAllRestaurants()
    restaurantService.isGeolocalisationEnable.asObservable().subscribe(value => {
      if (restaurantService.isGeolocalisationEnable) {
        restaurantService.position.asObservable().subscribe((value1 => {
          this.mapOptions = {
            center: {lat: value1.latitude, lng: value1.longitude},
            zoom: 11,
            disableDefaultUI: true,
          }
        }))
      }
    })
  }

  ngOnInit(): void {
    this.chechInternet()
  }

  // Permet de naviguer jusqu'à restaurant donné
  goMenu(idRestaurant: string) {
    this.router.navigate([`restaurant/${idRestaurant}`])
  }

  // Fonction verifiant la disponibilité de la connection internet
  chechInternet() {
    if (!navigator.onLine) {
      const dialogref = this.dialog.open(ErrorComponent, {
        data: {errorMessage: 'S\'il vous plait, vérifiez votre connexion internet!',codeError : 0},
        height: '400px',
        width: '80%',
        panelClass: 'my-dialog',
      }).afterClosed().subscribe(res => {
        window.location.reload();
      });
    }

  }

}
