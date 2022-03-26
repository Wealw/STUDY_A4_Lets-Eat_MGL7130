import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { NgModule } from  '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';


 
export  class  MyMaterialModule { }

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {


  signinForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })
  

  constructor() {
  }

  get email(){
    return this.signinForm.get('email');
  }

  get password(){
    return this.signinForm.get('password');
  }
  ngOnInit(): void {
  }
  // navigateToSignUp() {
  //   // noinspection JSIgnoredPromiseFromCall
  //   this.router.navigate([`sign-up`])
  // }
}
