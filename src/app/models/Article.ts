import {TaillePrix} from "./TaillePrix";

export class Article {
  nom: string
  description: string
  categorie: string
  photo: string
  taillePrix: TaillePrix[]

  constructor(
    nom: string,
    description: string,
    categorie: string,
    photo: string,
    taillePrix: TaillePrix[]
  ) {
    this.nom = nom;
    this.description = description;
    this.categorie = categorie;
    this.photo = photo;
    this.taillePrix = taillePrix;
  }
}
