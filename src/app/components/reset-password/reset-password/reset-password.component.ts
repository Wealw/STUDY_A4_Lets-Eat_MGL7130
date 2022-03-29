import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../sign-up/sign-up.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthGuardService} from "../../../services/Authentification/auth-guard.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  code : string;

  constructor(private route: ActivatedRoute,
              private router : Router,
              private angularAuth : AngularFireAuth,
              private authService : AuthGuardService,
              private _snackBar : MatSnackBar) {
    this.resetForm = new FormGroup({
      motdepasse: new FormControl('', [Validators.required, Validators.minLength(8)]),
      motdepasse2: new FormControl('', Validators.required)
    }, {validators: this.checkPasswords})

  }

  ngOnInit(): void {
    this.code = this.route.snapshot.queryParams['oobCode'];

  }
  onSubmit(){
    this.angularAuth
      .confirmPasswordReset(this.code, this.resetForm.get('motdepasse')?.value)
      .then(() => this.router.navigate(['sign-in']))
      .catch((err) => {
        console.log(err)
        let error = this.authService.getError(err['code'])
        this._snackBar.open(error, '', {
          duration: 3000,
          panelClass: 'orange-snackbar',
          horizontalPosition: 'center'
        })
      })
  }
  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('motdepasse')?.value;
    let confirmPass = group.get('motdepasse2')?.value;
    return pass === confirmPass ? null : {notSame: true}
  }
}
