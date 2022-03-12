import {Injectable} from '@angular/core';
import {AngularFirestore, CollectionReference} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app";
import {Observable} from "rxjs";

import {Recherche} from "../../models/Recherche";
import Query = firebase.firestore.Query;
import {Restaurant} from "../../models/Restaurant";
import {Article} from "../../models/Article";
import {TaillePrix} from "../../models/TaillePrix";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  restaurants: Restaurant[] = [];
  restaurant: Observable<any> = new Observable<any>();
  dishes: String[]
  categories: String[]
  recherche: Recherche
  position: GeolocationCoordinates

  constructor(private angularFirestore: AngularFirestore) {
    this.recherche = Recherche.getInstance();
    this.getAllCategory();
    this.getAllDishes()
    navigator.geolocation.watchPosition(position => {
      this.position = position.coords
    })
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
    if (!this.dishes) {
      const query = this.angularFirestore.collection('restaurant', ref => this.chainedQuery(ref)).valueChanges();
      let temp: String[] = []
      // noinspection JSIgnoredPromiseFromCall
      query.forEach(async results => {
        let result = results as Restaurant[]
        result.forEach(res => {
          res.menu.articles.forEach(article => {
            if (!temp.includes(article.nom)) {
              temp.push(article.nom)
            }
          })
        })
      })
      this.dishes = temp
      return this.dishes
    } else {
      return this.dishes
    }

  }

  getAllCategory() {
    if (!this.categories) {
      const query = this.angularFirestore.collection('restaurant', ref => this.chainedQuery(ref)).valueChanges();
      let temp: String[] = [""]
      // noinspection JSIgnoredPromiseFromCall
      query.forEach(async results => {
        let result = results as Restaurant[]
        result.forEach(res => {
          if (!temp.includes(res.categorie)) {
            temp.push(res.categorie)
          }
        })
      })
      this.categories = temp
      return this.categories
    } else {
      return this.categories
    }
  }

  private chainedQuery(ref: CollectionReference): Query {
    let temp = ref.orderBy("note")
    if (this.recherche.categorie != "" && this.recherche.categorie != undefined) temp = temp.where("categorie", "==", this.recherche.categorie)
    if (this.recherche.notation != undefined) temp = temp.where('note', '>=', this.recherche.notation)

    return temp
  }

  filter(tempRestaurantList: Restaurant[]) {
    let counter = tempRestaurantList.length - 1
    while (counter >= 0) {
      //Test if a restaurant have at leaste one article containing the search term
      if (!tempRestaurantList[counter].menu.articles.find((obj: Article) => obj.nom.includes(this.recherche.texte))) {
        tempRestaurantList.splice(counter, 1)
      }
      //Test if a restaurant fullfill the condition of minimum price
      else if (tempRestaurantList[counter].menu.articles.find((obj: Article) => obj.taillePrix.find((obj1: TaillePrix) => obj1.prix < this.recherche.prix_min))) {
        tempRestaurantList.splice(counter, 1)
      }
      //Test if a restaurant fullfill the condition of maximum price
      else if (tempRestaurantList[counter].menu.articles.find((obj: Article) => obj.taillePrix.find((obj1: TaillePrix) => obj1.prix > this.recherche.prix_max))) {
        tempRestaurantList.splice(counter, 1)
      }
      // Test if the restaurant is in range
      else if (this.calcultateDistance(this.position.latitude, this.position.longitude, tempRestaurantList[counter].geoPoint.latitude, tempRestaurantList[counter].geoPoint.longitude) > this.recherche.distance){
        tempRestaurantList.splice(counter, 1)
      }
        counter--
    }
    return tempRestaurantList
  }

  getOneRestaurant(id: any) {
    this.restaurant = this.angularFirestore.collection('restaurant').doc(id).valueChanges({idField: 'id'})
    return this.restaurant;
  }

  // Distance calculation : https://www.movable-type.co.uk/scripts/latlong.html
  calcultateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d / 1000
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
