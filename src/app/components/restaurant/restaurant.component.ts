import {Component, OnInit, ViewChild} from '@angular/core';
import {faClock, faHeart, faLocationArrow, faPhone} from '@fortawesome/free-solid-svg-icons';
import {RestaurantService} from "../../services/restaurant/restaurant.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Restaurant} from "../../models/Restaurant";
import {MatDialog} from "@angular/material/dialog";
import {ArticleComponent} from "../article/article.component";
import {Article} from "../../models/Article";
import {ClientService} from "../../services/client/client.service";
import {AuthGuardService} from "../../services/Authentification/auth-guard.service";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {Commentaire} from "../../models/Commentaire";
import {Notation} from "../../models/Notation";
import {MatSnackBar} from "@angular/material/snack-bar";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.ani', [
          style({opacity: 0, transform: 'translateY(-100px)'}),
          stagger(-30, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: '0px' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, width: '*' })),
          ]),
        ], { optional: true })
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ])
      ]),
    ]),
  ]

})
export class RestaurantComponent implements OnInit {

  displayBackButton = false
  faHeart = faHeart
  faClock = faClock
  faPhone = faPhone
  faLocationArrow = faLocationArrow
  col: any;
  colImage: any;
  colText: any;
  row: any;
  smallCol: any;
  bigCol: any;
  restaurant: Restaurant;
  isFavorite = false;
  showComments: boolean = false;
  showMenu: boolean = true;
  userComment: string = '';
  clicked = false;
  userNote = 0;
  oldNotation : Notation;

  constructor(private restaurantService: RestaurantService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private clientService: ClientService,
              public authService: AuthGuardService,
              private _snackBar: MatSnackBar
  ) {

  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnInit(): void {
    // adapter la taille des grid en fonction de la taille de l'ecran
    this.col = (window.screen.width <= 770) ? 1 : 2;
    this.colImage = (window.screen.width <= 770) ? 2 : 6;
    this.colText = (window.screen.width <= 770) ? 4 : 6;
    this.row = (window.screen.width <= 770) ? 1 : 2;
    this.smallCol = (window.screen.width <= 770) ? 6 : 2;
    this.bigCol = (window.screen.width <= 770) ? 6 : 4;
    this.showComments = window.screen.width > 770;
    let id = this.route.snapshot.paramMap.get('id');
    this.getRestaurant(id)
  }

  getRestaurant(id : any){
    this.restaurantService.getOneRestaurant(id).subscribe(res => {
      this.restaurant = res;
      if (this.authService.isConnected)this.checkNotation();
      this.checkFavorite();
    })
  }

  checkNotation(){
    let notation = this.restaurant.notations.filter(n=>{
     return n.idClient == this.authService.currentUser.id;
    })
    if (notation.length) {
      this.userNote = notation[0].note;
      this.oldNotation = notation[0];
    }
  }

  // adapter la taille des grid en fonction de la taille de l'ecran
  onResize(event: any) {
    this.col = (window.screen.width <= 770) ? 1 : 2;
    this.colImage = (window.screen.width <= 770) ? 2 : 6;
    this.colText = (window.screen.width <= 770) ? 4 : 6;
    this.row = (window.screen.width <= 770) ? 1 : 2;
    this.smallCol = (window.screen.width <= 770) ? 6 : 2;
    this.bigCol = (window.screen.width <= 770) ? 6 : 4;
    if (window.screen.width > 770) {
      this.showComments = true;
      this.showMenu = true;
    } else {
      if (this.showComments){
        this.showComments = true;
        this.showMenu = false;
      } else {
        this.showComments = false;
        this.showMenu = true;
      }
    }


  }

// Permet de naviguer vers les details d'un article
  toArticle(article: Article) {
    const dialogref = this.dialog.open(ArticleComponent, {
      data: {article: article},
      maxHeight: 'calc(100vh - 20px)',
      height: 'auto',
      width: '80%',
      panelClass: 'my-dialog',

    });

  }

// Permet d'ajouter un restaurant aux favoris
  async addToFavorite() {
    await this.clientService.addFavoriteRestaurant(this.restaurant)
    this.checkFavorite()

  }

// Permet de verifier si le restaurant est dans la list des favoris
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

  // Permet de naviguer entre le menu et les commentaires
  switchMenuComment() {
    this.showComments = !this.showComments;
    this.showMenu = !this.showMenu;
  }
  // Permet d'enregistrer un commentaire
  sendComment() {
    let user = this.authService.currentUser;
    if (user == null) this.authService.getError('notAuth');
    else {
      this.restaurant.commentaires.push(Object.assign({}, new Commentaire(this.userComment, user.id, user.nom, user.prenom)));
      this.restaurantService.addComment(this.restaurant).then(res => {
        this.userComment = '';
        this.clicked = false;
        this.displayMessage('Merci pour votre commentaire!')
      }).catch(err => {
        this.authService.getError(err['code']);
      });
    }
  }

  cancelComment() {
    this.userComment = '';
    this.clicked = false;
  }

  addNote() {
    let user = this.authService.currentUser;
    if (user == null) this.authService.getError('notAuth');
    else {
      let i = this.restaurant.notations.indexOf(this.oldNotation);
      if (i!==-1){
        this.oldNotation.note = this.userNote;
        this.restaurant.notations[i] = this.oldNotation;
      }
      else
      this.restaurant.notations.push(Object.assign({}, new Notation(this.userNote, user.id)));

      let sum = 0;
      this.restaurant.notations.forEach(n => {
        sum += n.note
      })
      this.restaurant.note = Math.round(sum / this.restaurant.notations.length);
      this.restaurantService.addNotation(this.restaurant).then(res => {
        this.displayMessage('Merci pour votre r??troaction!')

      }).catch(err => {
        this.authService.getError(err['code']);
      });
    }
  }

  displayMessage(message : string){
    this._snackBar.open(message, '', {
      duration: 3000,
      panelClass: 'orange-snackbar',
      horizontalPosition: 'center',

    });
  }

}
