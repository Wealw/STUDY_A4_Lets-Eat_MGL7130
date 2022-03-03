import {FormControl} from "@angular/forms";

export class Recherche {
  public texte: string
  public distance: number
  public prix_min: number
  public prix_max: number
  public categorie: string
  public notation: number

  private static instance : Recherche

  private constructor() {
    this.texte = ""
  }

  static getInstance(){
    if (Recherche.instance == undefined) Recherche.instance = new Recherche()
    return Recherche.instance
  }
}
