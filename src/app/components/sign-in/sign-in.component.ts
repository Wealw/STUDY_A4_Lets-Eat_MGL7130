import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthGuardService} from "../../services/Authentification/auth-guard.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signinForm: FormGroup;
  errorMessage: string;

  constructor(private router: Router,
              private authService: AuthGuardService) {
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
        this.authService.isConnected = true;
        this.router.navigate(['acceuil'])
      })
      .catch((error) => {
        console.log(error)
        this.errorMessage = error
      });
  }

  // navigateToSignUp() {
  //   // noinspection JSIgnoredPromiseFromCall
  //   this.router.navigate([`sign-up`])
  // }
}
