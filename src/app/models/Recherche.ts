export class Recherche {
  private static instance: Recherche
  public texte: string
  public distance: number
  public prix_min: number|undefined
  public prix_max: number|undefined
  public categorie: string|undefined
  public notation: number|undefined

  private constructor() {
    this.texte = ""
    this.distance = 100
    this.notation = 1
  }

  static getInstance() {
    if (Recherche.instance == undefined) Recherche.instance = new Recherche()
    return Recherche.instance
  }

  reset(){
    this.texte = ""
    this.distance = 100
    this.prix_min = undefined
    this.prix_max = undefined
    this.categorie = undefined
    this.notation = 1
  }

  // Verifie si les filtre sont utilisés.
  checkIfFilterAreInUse(){
    const textInUse = this.texte !== ""
    const distanceInUse = this.distance !== 100
    const prixMinInUse = this.prix_max !== undefined
    const prixMaxInUse = this.prix_min !== undefined
    const notationInUse = this.notation !== 1
    const categorieInUse = !(this.categorie === undefined || this.categorie === "")
    return textInUse || distanceInUse || prixMaxInUse || prixMinInUse || notationInUse || categorieInUse
  }
}
