import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Menu} from "../../models/Menu";
import {Article} from "../../models/Article";
import {TaillePrix} from "../../models/TaillePrix";
import firebase from "firebase/compat/app";
import {Observable} from "rxjs";
import {Adresse} from "../../models/Adresse";
import GeoPoint = firebase.firestore.GeoPoint;
import {Recherche} from "../../models/Recherche";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  restaurants: Observable<any> = new Observable<any>();
  restaurant: Observable<any> = new Observable<any>();
  recherche : Recherche

  constructor(private angularFirestore: AngularFirestore) {
    this.recherche = new Recherche()
  }

  getAllRestaurents() {
    this.restaurants = this.angularFirestore.collection('restaurant').valueChanges({idField: 'id'})
    return this.restaurants
  }

  getOneRestaurent(id: any) {
    this.restaurant = this.angularFirestore.collection('restaurant').doc(id).valueChanges({idField: 'id'})
    return this.restaurant;
  }

  addRestaurant() {
    let articles: Article[] = [];
    let taillesPrix: TaillePrix[] = [];
    taillesPrix.push(Object.assign({}, new TaillePrix('10', 15)))

    articles.push(Object.assign({}, new Article('pizza vegetarienne', 'blabla', 'pizza', '', taillesPrix)));
    let menu = Object.assign({}, new Menu(articles));
    let adresse = Object.assign({}, new Adresse('125', 'monet', 'Montréal QC', 'H4T J8Q', 'Canada'));

    let newRestau = this.angularFirestore.collection('restaurant')
      .doc('2')
      .set({
        nom: "Le Bon Coin", categorie: 'fastFood', numeroTelephone: '5144528755',
        adresse: adresse, geoPoint: new GeoPoint(45.503433, -73.6570132),
        calendrier: [], isHalal: false, menu
      });
    // this.angularFirestore.collection('restaurant').doc('1').collection('menu').doc().set(Object.assign({},menu))
  }

}
