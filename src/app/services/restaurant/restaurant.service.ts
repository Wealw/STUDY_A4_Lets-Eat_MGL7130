import {Injectable} from '@angular/core';
import {AngularFirestore, CollectionReference} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app";
import {Observable} from "rxjs";

import {Recherche} from "../../models/Recherche";
import Query = firebase.firestore.Query;
import {Restaurant} from "../../models/Restaurant";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  restaurants: Restaurant[] = [];
  restaurant: Observable<any> = new Observable<any>();
  recherche: Recherche

  constructor(private angularFirestore: AngularFirestore) {
    this.recherche = Recherche.getInstance();
  }

  getAllRestaurants() {
    console.log('recherche --->',this.recherche)
    let temp: Restaurant[] = []
    let query = this.angularFirestore.collection('restaurant', ref => this.chainedQuery(ref)).valueChanges();
    // noinspection JSIgnoredPromiseFromCall
    query.forEach(obj => {
      obj.forEach(res => {
        temp.push(res as Restaurant)
      })
    })
    console.log(temp)
    this.restaurants = temp
    return this.restaurants
  }

  private chainedQuery(ref: CollectionReference): Query {
    let temp = ref.orderBy("note")
    if (this.recherche.categorie != "" && this.recherche.categorie != undefined) temp = temp.where("categorie", "==", this.recherche.categorie)
    // TODO : Check if the attribute are available
    if (this.recherche.notation != undefined) temp = temp.where('note', '>=', 3)
    if (this.recherche.prix_min != undefined) temp = temp.where('menu.articles', 'array-contains', {nom : 'pizza nature'})
    if (this.recherche.prix_max != undefined) temp = temp.where("categorie", "==", this.recherche.categorie)
    console.log('temp --->',temp)
    return temp
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
