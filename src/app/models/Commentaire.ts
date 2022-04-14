export class Commentaire {
  commentaire: string
  idClient: string
  nomClient: string
  prenomClient: string

  constructor(
    commentaire: string,
    idClient: string,
    nomClient: string,
    prenomClient: string
  ) {
    this.commentaire = commentaire;
    this.idClient = idClient;
    this.nomClient = nomClient;
    this.prenomClient = prenomClient;
  }
}
