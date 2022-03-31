import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthGuardService} from "../../services/Authentification/auth-guard.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signinForm: FormGroup;

  constructor(public router: Router,
              private authService: AuthGuardService,
              private _snackBar: MatSnackBar) {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      motdepasse: new FormControl('', Validators.required)
    })
  }


  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.signin(this.signinForm.get('email')?.value, this.signinForm.get('motdepasse')?.value)
      .then(() => {
        this.router.navigate(['acceuil'])
      })
      .catch((err) => {
        this.authService.getError(err['code'])

      }),
      () => { console.log('done.');}
  }

  navigateResetPassword() {
    this.router.navigate(['resetPassword'])
  }
}
