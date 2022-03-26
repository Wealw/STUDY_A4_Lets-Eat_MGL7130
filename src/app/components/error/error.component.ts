import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  errorMessage : string;
  codeError : number;
  constructor(private dialogRef: MatDialogRef<ErrorComponent>,
              @Inject(MAT_DIALOG_DATA) public data?: any) { }

  ngOnInit(): void {
    this.errorMessage= this.data.errorMessage;
    this.codeError= this.data.codeError;
  }
}
