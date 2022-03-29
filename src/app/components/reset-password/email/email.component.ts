import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthGuardService} from "../../../services/Authentification/auth-guard.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  emailForm : FormGroup;
  constructor(private afAuth: AngularFireAuth,
              private authService : AuthGuardService,
              private _snackBar : MatSnackBar) {
    this.emailForm = new FormGroup({
      email: new FormControl ('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
  }
  onSubmit(){
    this.afAuth.sendPasswordResetEmail(this.emailForm.controls['email'].value).then(
      () => {
        this._snackBar.open('Email à bien été envoyé, verifiez votre boite couriel', '', {
          duration: 3000,
          panelClass: 'orange-snackbar',
          horizontalPosition: 'center'
        })      }
    ).catch((err) => {
      let error = this.authService.getError(err['code'])
      this._snackBar.open(error, '', {
        duration: 3000,
        panelClass: 'orange-snackbar',
        horizontalPosition: 'center'
      })
  })
}
}
