import {Component, Inject, NgZone, OnInit, ViewChild} from '@angular/core';
import {Article} from "../../models/Article";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {take} from "rxjs";

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
  rowDescription : number;

  constructor(private _ngZone: NgZone,
              private dialogRef: MatDialogRef<ArticleComponent>,
              @Inject(MAT_DIALOG_DATA) public data?: any) {
  }
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {
    // Récupération de l'article
    this.article = this.data.article;
    this.col = (window.screen.width <= 800) ? 1 : 2;
    this.rowHeight = (window.screen.height <= 600) ? 70 : 120;
    this.rowDescription = (window.screen.width <= 800) ? 1 : 2;

  }

  // Redimentionner la vue en fonction de l'écran
  onResize(event: any) {
    this.col = (window.screen.width <= 800) ? 1 : 2;
    this.rowHeight = (window.screen.height <= 600) ? 70 : 120;
    this.rowDescription = (window.screen.width <= 800) ? 1 : 2;

  }
}
