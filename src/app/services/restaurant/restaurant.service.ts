import {Injectable} from '@angular/core';
import {AngularFirestore, CollectionReference} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app";
import {BehaviorSubject, Observable} from "rxjs";
import random from 'random-seedable';

import {Recherche} from "../../models/Recherche";
import {Restaurant} from "../../models/Restaurant";
import {Article} from "../../models/Article";
import {TaillePrix} from "../../models/TaillePrix";
import Query = firebase.firestore.Query;
import {addDoc, collection} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  restaurants: Restaurant[] = [];
  restaurant: Observable<any> = new Observable<any>();
  dishes: string[]
  categories: string[]
  recherche: Recherche
  position: BehaviorSubject<GeolocationCoordinates>
  isGeolocalisationEnable: BehaviorSubject<boolean>;

  constructor(private angularFirestore: AngularFirestore) {
    this.recherche = Recherche.getInstance();
    this.getAllCategory();
    this.getAllDishes()
    this.isGeolocalisationEnable = new BehaviorSubject<boolean>(false)
    this.position = new BehaviorSubject<GeolocationCoordinates>({
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      latitude: 0,
      longitude: 0,
      speed: 0,})
    let success = (position : any) => {
      this.position.next(position.coords)
      this.isGeolocalisationEnable.next(true)
      this.getAllRestaurants()
    }
    let failure = ()=>{
      this.isGeolocalisationEnable.next(false)
      navigator.geolocation.getCurrentPosition(
        position => {
          success(position)
        },
        ()=>{
          failure()
        }
      )
    }
    // init
    navigator.geolocation.getCurrentPosition(
      position => {
        success(position)
      },
      ()=>{
        failure()
      }
    )
    // Auto refresh
    navigator.geolocation.watchPosition(
      position => {
        success(position)
      },
      () => {
        failure()
      })
  }

// permet de recuperer tous les restaurants
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

// permet de recuperer tous les articles de tous les restaurants
  getAllDishes() {
    if (!this.dishes) {
      const query = this.angularFirestore.collection('restaurant', ref => this.chainedQuery(ref)).valueChanges();
      let temp: string[] = []
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

  getBestDishes(search: string){
    let temp : string[] =  this.dishes
    temp = temp.filter(value => value.toUpperCase().includes(search.toUpperCase()))
    temp = temp.slice(0,5)
    random.seed = 4269
    temp = random.shuffle(temp)
    return temp
  }

// permet de recuperer toutes les categories des differents restaurants
  getAllCategory() {
    if (!this.categories) {
      const query = this.angularFirestore.collection('restaurant', ref => this.chainedQuery(ref)).valueChanges();
      let temp: string[] = [""]
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

  filter(tempRestaurantList: Restaurant[]) {
    let counter = tempRestaurantList.length - 1
    while (counter >= 0) {
      //Tester si un restaurant a au moins un article contenant le terme de recherche
      if (!tempRestaurantList[counter].menu.articles.find((obj: Article) => obj.nom.includes(this.recherche.texte))) {
        tempRestaurantList.splice(counter, 1)
      }
      //Tester si un restaurant remplit la condition de prix minimum
      else if (tempRestaurantList[counter].menu.articles.find((obj: Article) => obj.taillePrix.find((obj1: TaillePrix) => obj1.prix < this.recherche.prix_min))) {
        tempRestaurantList.splice(counter, 1)
      }
      //Tester si un restaurant remplit la condition de prix maximum
      else if (tempRestaurantList[counter].menu.articles.find((obj: Article) => obj.taillePrix.find((obj1: TaillePrix) => obj1.prix > this.recherche.prix_max))) {
        tempRestaurantList.splice(counter, 1)
      }
      // Testez si le restaurant est à portée
      else if (this.isGeolocalisationEnable && this.calcultateDistance(this.position.getValue().latitude, this.position.getValue().longitude, tempRestaurantList[counter].geoPoint.latitude, tempRestaurantList[counter].geoPoint.longitude) > this.recherche.distance) {
        tempRestaurantList.splice(counter, 1)
      }
      counter--
    }
    return tempRestaurantList
  }

  // permet de recuperer un restaurant en fonction de son ID
  getOneRestaurant(id: any) {
    this.restaurant = this.angularFirestore.collection('restaurant').doc(id).valueChanges()
    return this.restaurant;
  }

  // permet de calculer la distance entre l'utilisateur et le restaurant concerné
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

  // Distance calculation : https://www.movable-type.co.uk/scripts/latlong.html

  // Permet de récuperer les restaurants en fonction de la notation et la catégorie
  private chainedQuery(ref: CollectionReference): Query {
    let temp = ref.orderBy("note")
    if (this.recherche.categorie != "" && this.recherche.categorie != undefined) temp = temp.where("categorie", "==", this.recherche.categorie)
    if (this.recherche.notation != undefined) temp = temp.where('note', '>=', this.recherche.notation)

    return temp
  }

  addComment(restaurant : Restaurant){
    return this.angularFirestore.collection('restaurant').doc(restaurant.id.toString()).update({commentaires : restaurant.commentaires})
  }
  addNotation(restaurant : Restaurant){
    return this.angularFirestore.collection('restaurant').doc(restaurant.id.toString()).update({notations : restaurant.notations, note : restaurant.note})
  }

}
