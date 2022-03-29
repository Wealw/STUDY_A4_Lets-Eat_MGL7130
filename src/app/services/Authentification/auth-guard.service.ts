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
  public errorMessage: string;

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
        this.isConnected = true;
        this.currentUser = user
      } else {
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

  getError(errorCode: string) {

    let message: string;

    switch (errorCode) {
      case 'auth/wrong-password':
        message = 'Authentification invalide.';
        break;
      case 'auth/network-request-failed':
        message = 'S\'il vous plait, vérifiez votre connexion internet';
        break;
      case 'auth/too-many-requests':
        message =
          'Nous avons détecté trop de demandes provenant de votre appareil. Faites une pause s\'il vous plait !';
        break;
      case 'auth/user-disabled':
        message =
          'Votre compte a été désactivé ou supprimé. Veuillez contacter l\'administrateur système.';
        break;
      case 'auth/requires-recent-login':
        message = 'Veuillez vous reconnecter et réessayer!';
        break;
      case 'auth/email-already-in-use':
        message = 'L\'adresse e-mail est déjà utilisée par un utilisateur existant.';
        break;
      case 'auth/user-not-found':
        message =
          'Nous n\'avons pas trouvé de compte d\'utilisateur associé à l\'adresse e-mail.';
        break;
      case 'auth/invalid-email':
        message = 'L\'adresse e-mail n\'est valide!';
        break;
        case 'auth/weak-password':
        message = 'Ce mot de passe n\'est pas valide!';
        break;
      default:
        message = 'Oups! Quelque chose s\'est mal passé. Réessayez plus tard.';
        break;
    }

    return message;
  }
}
