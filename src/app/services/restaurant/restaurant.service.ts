import {Injectable} from '@angular/core';
import {AngularFirestore, CollectionReference} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app";
import {Observable} from "rxjs";

import {Recherche} from "../../models/Recherche";
import Query = firebase.firestore.Query;
import {Restaurant} from "../../models/Restaurant";
import {Article} from "../../models/Article";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  restaurants: Restaurant[] = [];
  restaurant: Observable<any> = new Observable<any>();
  dishes: String[] = [];
  recherche: Recherche

  constructor(private angularFirestore: AngularFirestore) {
    this.recherche = Recherche.getInstance();
  }

  getAllRestaurants() {
    let temp: Array<Restaurant> = []
    const query = this.angularFirestore.collection('restaurant', ref => this.chainedQuery(ref)).valueChanges();
    // noinspection JSIgnoredPromiseFromCall
    query.forEach(async (obj) => {
      temp = obj as Restaurant[]
      temp = this.filter(temp)
      this.restaurants = temp
      return this.restaurants
    })
  }

  getAllDishes() {
    let temp: String[] = []
    this.restaurants.forEach(res => {
      res.menu.articles.forEach(art => {
        temp.push(art.nom)
      })
    })
    this.dishes = temp
    return this.dishes
    //temp[counter].menu.articles.find((obj: Article) => {console.log(obj.nom)})
  }

  private chainedQuery(ref: CollectionReference): Query {
    let temp = ref.orderBy("note")
    if (this.recherche.categorie != "" && this.recherche.categorie != undefined) temp = temp.where("categorie", "==", this.recherche.categorie)
    if (this.recherche.notation != undefined) temp = temp.where('note', '>=', this.recherche.notation)
    // TODO : Check if the attribute are available
    if (this.recherche.prix_min != undefined) temp = temp.where('menu.articles', 'array-contains', {nom: 'pizza nature'})
    if (this.recherche.prix_max != undefined) temp = temp.where("categorie", "==", this.recherche.categorie)
    return temp
  }

  filter(tempRestaurantList: Restaurant[]) {
    let counter = tempRestaurantList.length - 1
    while (counter > 0) {
      let areDishesMatch =false
      if (!tempRestaurantList[counter].menu.articles.find((obj: Article) => obj.nom.includes(this.recherche.texte))) {
        tempRestaurantList.splice(counter, 1)
        counter--
      }
      counter--
    }
    return tempRestaurantList
  }

  getOneRestaurant(id: any) {
    this.restaurant = this.angularFirestore.collection('restaurant').doc(id).valueChanges({idField: 'id'})
    return this.restaurant;
  }

  // addRestaurant() {
  //   let articles: Article[] = [];
  //   let taillesPrix: TaillePrix[] = [];
  //   taillesPrix.push(Object.assign({}, new TaillePrix('10', 15)))
  //
  //   articles.push(Object.assign({}, new Article('pizza vegetarienne', 'blabla', 'pizza', '', taillesPrix)));
  //   let menu = Object.assign({}, new Menu(articles));
  //   let adresse = Object.assign({}, new Adresse('125', 'monet', 'Montréal QC', 'H4T J8Q', 'Canada'));
  //
  //   let newRestau = this.angularFirestore.collection('restaurant')
  //     .doc('2')
  //     .set({
  //       nom: "Le Bon Coin", categorie: 'fastFood', numeroTelephone: '5144528755',
  //       adresse: adresse, geoPoint: new GeoPoint(45.503433, -73.6570132),
  //       calendrier: [], isHalal: false, menu
  //     });
  //   // this.angularFirestore.collection('restaurant').doc('1').collection('menu').doc().set(Object.assign({},menu))
  // }

}
