import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import firebase from "firebase/compat/app";
import {Client} from "../../models/Client";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  public isConnected: boolean;
  public currentUser: any;

  constructor(public router: Router,
              private angularFirestore: AngularFirestore,
              private angularFireAuth: AngularFireAuth,
              private _snackBar: MatSnackBar) {
  }

  canActivate(): boolean {
    if (!this.isConnected) {
      this._snackBar.open("Vous devez etre connecté!", '', {
        duration: 3000,
        panelClass: 'orange-snackbar',
        horizontalPosition: 'center',

      });
      return false;
    }
    console.log('connected');
    return true;
  }

  checkAuthentification() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user connected --->', user.email)
        this.isConnected = true;
        this.currentUser = user
      } else {
        console.log('user not connected --->', user)

        this.isConnected = false;
        this.currentUser = user

      }
    });
  }

  signup(client: Client, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(client.email, password).then(() => {
      this.angularFirestore.collection('client').doc().set(Object.assign({}, client))
        .then(() => {
          this.angularFireAuth.signInWithEmailAndPassword(client.email, password);
        })
    })
  }

  signin(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  signout() {
    return this.angularFireAuth.signOut()
  }
}
