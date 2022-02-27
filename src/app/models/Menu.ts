import {Article} from "./Article";

export class Menu {
  articles: Article[]

  constructor(
    articles: Article[],
  ) {
    this.articles = articles;
  }
}
