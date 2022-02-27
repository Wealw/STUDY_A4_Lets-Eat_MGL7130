export class Commentaire {
  id?: string
  commentaire: string
  idClient: string
  nomClient: string
  prenomClient: string

  constructor(
    id: string,
    commentaire: string,
    idClient: string,
    nomClient: string,
    prenomClient: string
  ) {
    this.id = id;
    this.commentaire = commentaire;
    this.idClient = idClient;
    this.nomClient = nomClient;
    this.prenomClient = prenomClient;
  }
}
