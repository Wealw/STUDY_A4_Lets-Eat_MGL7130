export class Recherche {
  private static instance: Recherche
  public texte: string
  public distance: number
  public prix_min: number
  public prix_max: number
  public categorie: string
  public notation: number

  private constructor() {
    this.texte = ""
    this.distance = 100
  }

  static getInstance() {
    if (Recherche.instance == undefined) Recherche.instance = new Recherche()
    return Recherche.instance
  }
}
