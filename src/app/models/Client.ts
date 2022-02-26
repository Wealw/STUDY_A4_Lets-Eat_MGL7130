import {Restaurant} from "./Restaurant";

export class Client {
  id: string;
  nom: string;
  prenom: string;
  visitedRestaurents: Restaurant[];
  favoritRestaurents: Restaurant[];
  email: string;
  password: string;

  constructor(
    id: string,
    nom: string,
    prenom: string,
    visitedRestaurents: Restaurant[],
    favoritRestaurents: Restaurant[],
    email: string,
    password: string
  ) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.visitedRestaurents = visitedRestaurents;
    this.favoritRestaurents = favoritRestaurents;
    this.email = email;
    this.password = password;

  }
}
