import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {
  faBackspace,
  faBackward,
  faClock,
  faEllipsisV,
  faFastBackward,
  faHeart,
  faLocationArrow,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import {OptionComponent} from "../option/option.component";
import {RestaurantService} from "../../services/restaurant/restaurant.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Restaurant} from "../../models/Restaurant";
import {MatDialog} from "@angular/material/dialog";
import {ArticleComponent} from "../article/article.component";
import {Article} from "../../models/Article";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  @ViewChildren(OptionComponent) options: QueryList<OptionComponent>

  displayBackButton = false
  faEllipsisV = faEllipsisV
  faBackward = faBackward
  faBackspace = faBackspace
  faFastBackward = faFastBackward
  faHeart = faHeart
  faClock = faClock
  faPhone = faPhone
  faLocationArrow = faLocationArrow
  col: any;

  option: OptionComponent | undefined;
  restaurant: Restaurant;
  today: Date;

  constructor(private restaurantService: RestaurantService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.col = (window.screen.width <= 667) ? 1 : 2;

    let id = this.route.snapshot.paramMap.get('id');
    this.restaurantService.getOneRestaurant(id).subscribe(res => {
      this.restaurant = res;
      this.today = new Date;
    })

  }

  onResize(event: any) {
    this.col = (window.screen.width <= 667) ? 1 : 2;
  }

  toArticle(article: Article) {
    console.log('toArticle called')
    const dialogref = this.dialog.open(ArticleComponent, {data: {article: article},maxHeight: 'calc(100vh - 20px)', height : 'auto', width: '80%'});

  }
}
