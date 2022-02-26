import {Menu} from "./Menu";
import {JoursHeures} from "./JoursHeures";
import firebase from "firebase/compat";
import {Adresse} from "./Adresse";
import GeoPoint = firebase.firestore.GeoPoint;

export class Restaurant {
  id ?: any
  nom: string
  categorie: string
  numeroTelephone: string
  adresse: Adresse
  geoPoint: GeoPoint
  calendrier: JoursHeures[]
  menu: Menu
  note: number

  constructor(
    id: any,
    nom: string,
    categorie: string,
    numeroTelephone: string,
    adresse: Adresse,
    geoPoint: GeoPoint,
    calendrier: JoursHeures[],
    menu: Menu,
    note: number
  ) {
    this.id = id;
    this.nom = nom;
    this.categorie = categorie;
    this.numeroTelephone = numeroTelephone;
    this.adresse = adresse;
    this.geoPoint = geoPoint;
    this.calendrier = calendrier;
    this.menu = menu;
    this.note = note;

  }


}
