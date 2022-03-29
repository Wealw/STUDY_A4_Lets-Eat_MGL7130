import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {createUserWithEmailAndPassword, getAuth} from "@angular/fire/auth";
import {Client} from "../../models/Client";
import {ErrorStateMatcher} from "@angular/material/core";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthGuardService} from "../../services/Authentification/auth-guard.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(public router: Router,
              private _snackBar: MatSnackBar,
              private authService : AuthGuardService) {
    this.signupForm = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{2,32}')]),
      prenom: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{2,32}')] ),
      email: new FormControl('', [Validators.required, Validators.email]),
      motdepasse: new FormControl('', [Validators.required, Validators.minLength(8)]),
      motdepasse2: new FormControl('', Validators.required)
    }, {validators: this.checkPasswords})
  }

  ngOnInit(): void {


  }

  onSubmit() {
    let client: Client = new Client('',
      this.signupForm.get('nom')?.value,
      this.signupForm.get('prenom')?.value,
      [],
      [],
      this.signupForm.get('email')?.value);

        // Enregistrement du nouveau client
        this.authService.signup(client,this.signupForm.get('motdepasse')?.value).then(() => {
          this._snackBar.open("Vous avez été bien enregistré!", '', {
            duration: 3000,
            panelClass: 'orange-snackbar',
            horizontalPosition: 'center'
          });
          this.router.navigate(['acceuil']);
        }).catch((err) => {
          let error = this.authService.getError(err['code'])
          this._snackBar.open(error, '', {
            duration: 3000,
            panelClass: 'orange-snackbar',
            horizontalPosition: 'center'
          })
        });



  }

  password() {

    return this.signupForm.get('motdepasse')?.value != this.signupForm.get('motdepasse2')?.value;
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('motdepasse')?.value;
    let confirmPass = group.get('motdepasse2')?.value;
    return pass === confirmPass ? null : {notSame: true}
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}
