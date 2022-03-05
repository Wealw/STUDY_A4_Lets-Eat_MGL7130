import {TaillePrix} from "./TaillePrix";

export class Article {
  id?: string
  nom: string
  description: string
  categorie: string
  photo: string
  taillePrix: TaillePrix[]

  constructor(
    id: string,
    nom: string,
    description: string,
    categorie: string,
    photo: string,
    taillePrix: TaillePrix[]
  ) {
    this.id = id;
    this.description = description;
    this.categorie = categorie;
    this.photo = photo;
    this.taillePrix = taillePrix;
  }
}
