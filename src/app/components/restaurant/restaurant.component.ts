import {Component, OnInit} from '@angular/core';
import {faClock, faHeart, faLocationArrow, faPhone} from '@fortawesome/free-solid-svg-icons';
import {RestaurantService} from "../../services/restaurant/restaurant.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Restaurant} from "../../models/Restaurant";
import {MatDialog} from "@angular/material/dialog";
import {ArticleComponent} from "../article/article.component";
import {Article} from "../../models/Article";
import {ClientService} from "../../services/client/client.service";
import {AuthGuardService} from "../../services/Authentification/auth-guard.service";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  displayBackButton = false
  faHeart = faHeart
  faClock = faClock
  faPhone = faPhone
  faLocationArrow = faLocationArrow
  col: any;
  row: any;
  smallCol: any;
  bigCol: any;
  restaurant: Restaurant;
  isFavorite = false;

  constructor(private restaurantService: RestaurantService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private clientService: ClientService,
              public authService: AuthGuardService,
  ) {

  }

  ngOnInit(): void {

    // adapter la taille des grid en fonction de la taille de l'ecran
    this.col = (window.screen.width <= 770) ? 1 : 2;
    this.row = (window.screen.width <= 770) ? 1 : 2;
    this.smallCol = (window.screen.width <= 770) ? 0 : 1;
    this.bigCol = (window.screen.width <= 770) ? 4 : 3;

    let id = this.route.snapshot.paramMap.get('id');
    this.restaurantService.getOneRestaurant(id).subscribe(res => {
      this.restaurant = res;
      this.checkFavorite();
    })

  }

  // adapter la taille des grid en fonction de la taille de l'ecran
  onResize(event: any) {
    this.col = (window.screen.width <= 770) ? 1 : 2;
    this.row = (window.screen.width <= 770) ? 1 : 2;
    this.smallCol = (window.screen.width <= 770) ? 0 : 1;
    this.bigCol = (window.screen.width <= 770) ? 4 : 3;
  }

// Permet de naviguer vers les details d'un article
  toArticle(article: Article) {
    console.log('toArticle called')
    const dialogref = this.dialog.open(ArticleComponent, {
      data: {article: article},
      maxHeight: 'calc(100vh - 20px)',
      height: 'auto',
      width: '80%'
    });

  }

  async addToFavorite() {
    await this.clientService.addFavoriteRestaurant(this.restaurant)
    this.checkFavorite()

  }

  async checkFavorite() {
    try {
      if (this.authService.currentUser) {
        let rest = this.authService.currentUser.favoritRestaurents.filter((res: { id: any; }) => {
          return res.id == this.restaurant.id
        });
        if (rest.length > 0) this.isFavorite = true; else this.isFavorite = false;
      }
    } catch (err) {
      this.authService.getError('');

    }
  }
}
