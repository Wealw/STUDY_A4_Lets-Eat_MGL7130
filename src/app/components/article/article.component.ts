import {Component, Inject, OnInit} from '@angular/core';
import {Article} from "../../models/Article";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article;
  // la taille selectionnée pour afficher le prix
  selectedSize: number = 0;
  rowHeight: any;
  col: any;

  constructor(private dialogRef: MatDialogRef<ArticleComponent>,
              @Inject(MAT_DIALOG_DATA) public data?: any) {
  }

  ngOnInit(): void {
    // recuperation de l'article
    this.article = this.data.article;
    this.col = (window.screen.width <= 800) ? 1 : 2;
    this.rowHeight = (window.screen.height <= 600) ? 70 : 120;

  }

  // redimentionner la vue en fonction de l'ecran
  onResize(event: any) {
    this.col = (window.screen.width <= 800) ? 1 : 2;
    this.rowHeight = (window.screen.height <= 600) ? 75 : 100;
  }
}
