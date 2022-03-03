import {Injectable} from '@angular/core';
import {AngularFirestore, CollectionReference} from "@angular/fire/compat/firestore";
import {Menu} from "../../models/Menu";
import {Article} from "../../models/Article";
import {TaillePrix} from "../../models/TaillePrix";
import firebase from "firebase/compat/app";
import {map, Observable} from "rxjs";
import {Adresse} from "../../models/Adresse";
import GeoPoint = firebase.firestore.GeoPoint;
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
    console.log(this.recherche)
    let temp: Restaurant[] = []
    let query = this.angularFirestore.collection('restaurant', ref => this.chainedQuery(ref)).valueChanges()
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
    let temp = ref.orderBy("nom")
    if (this.recherche.categorie != "" && this.recherche.categorie != undefined) temp = temp.where("categorie", "==", this.recherche.categorie)
    // TODO : Check if the attribute are available
    if (this.recherche.notation != 0) temp = temp.where('notation', '>=', this.recherche.notation)
    if (this.recherche.prix_min) temp = temp.where("menu.articles.*.taillePrix.prix", "==", this.recherche.prix_min)
    if (this.recherche.prix_max) temp = temp.where("categorie", "==", this.recherche.categorie)
    return temp
  }

  getOneRestaurant(id: any) {
    this.restaurant = this.angularFirestore.collection('restaurant').doc(id).valueChanges({idField: 'id'})
    return this.restaurant;
  }
}
