import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { NgModule } from  '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


 
export  class  MyMaterialModule { }

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  

  constructor() {
  }

  ngOnInit(): void {
  }
  // navigateToSignUp() {
  //   // noinspection JSIgnoredPromiseFromCall
  //   this.router.navigate([`sign-up`])
  // }
}
