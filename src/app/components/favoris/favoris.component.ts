import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthGuardService} from "../../services/Authentification/auth-guard.service";
import {Restaurant} from "../../models/Restaurant";

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {

  col: any;
  colImage: any;
  colText: any;
  row: any;
  smallCol: any;
  bigCol: any;
  restaurants : Restaurant[];
  constructor(
    private router: Router,

    public authService : AuthGuardService
  ){}

  ngOnInit(): void {
    this.col = (window.screen.width <= 770) ? 1 : 2;
    this.colImage = (window.screen.width <= 770) ? 2 : 6;
    this.colText = (window.screen.width <= 770) ? 4 : 6;
    this.row = (window.screen.width <= 770) ? 1 : 2;
    this.smallCol = (window.screen.width <= 770) ? 0 : 1;
    this.bigCol = (window.screen.width <= 770) ? 4 : 3;


     this.restaurants= this.authService.currentUser.favoritRestaurents;

     }
     // adapter la taille des grid en fonction de la taille de l'ecran
  onResize(event: any) {
    this.col = (window.screen.width <= 770) ? 1 : 2;
    this.colImage = (window.screen.width <= 770) ? 2 : 6;
    this.colText = (window.screen.width <= 770) ? 4 : 6;
    this.row = (window.screen.width <= 770) ? 1 : 2;
    this.smallCol = (window.screen.width <= 770) ? 0 : 1;
    this.bigCol = (window.screen.width <= 770) ? 4 : 3;
  }

  toRestaurant(idRestaurant : string){
    this.router.navigate([`restaurant/${idRestaurant}`])
  }
  navigateToMain() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([`/`])
  }

  }

