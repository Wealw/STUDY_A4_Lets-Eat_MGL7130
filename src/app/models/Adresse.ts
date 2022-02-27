export class Adresse {
  numeroDeRue: string;
  rue: string;
  ville: string;
  codePostal: string;
  pays: string;


  constructor(
    numeroDeRue: string,
    rue: string,
    ville: string,
    codePostal: string,
    pays: string) {
    this.numeroDeRue = numeroDeRue;
    this.rue = rue;
    this.ville = ville;
    this.codePostal = codePostal;
    this.pays = pays;
  }
}
