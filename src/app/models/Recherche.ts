import {FormControl} from "@angular/forms";

export class Recherche extends FormControl{
  public texte: string
  public distance: number
  public prix_min: number
  public prix_max: number
  public categorie: string
  public notation: number


  constructor() {
    super()
    this.texte = "";
    this.distance = 2;
    this.prix_min = 0;
    this.prix_max = 456789;
    this.categorie = "";
    this.notation = 5;
  }

  public GenerateSearchString() {
    return ""
  }
}
