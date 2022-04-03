import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {

  col: any;
  row: any;
  smallCol: any;
  bigCol: any;

  constructor( 
    private router: Router,
  ) { }

  ngOnInit(): void {

     

     }
     // adapter la taille des grid en fonction de la taille de l'ecran
  onResize(event: any) {
    this.col = (window.screen.width <= 770) ? 1 : 2;
    this.row = (window.screen.width <= 770) ? 1 : 2;
    this.smallCol = (window.screen.width <= 770) ? 0 : 1;
    this.bigCol = (window.screen.width <= 770) ? 4 : 3;
  }


  }

 
