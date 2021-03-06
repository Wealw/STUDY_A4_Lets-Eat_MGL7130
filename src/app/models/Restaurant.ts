import {Menu} from "./Menu";
import {JoursHeures} from "./JoursHeures";
import firebase from "firebase/compat";
import {Adresse} from "./Adresse";
import GeoPoint = firebase.firestore.GeoPoint;
import {Commentaire} from "./Commentaire";
import {Notation} from "./Notation";

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
  commentaires : Commentaire[];
  notations : Notation[];
  logo : string;

  constructor(
    id: any,
    nom: string,
    categorie: string,
    numeroTelephone: string,
    adresse: Adresse,
    geoPoint: GeoPoint,
    calendrier: JoursHeures[],
    menu: Menu,
    note: number,
    commentaires : Commentaire[],
    notations : Notation[],
    logo : string
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
    this.commentaires = commentaires;
    this.notations = notations;
    this.logo = logo;

  }


}
