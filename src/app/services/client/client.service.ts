import {Injectable} from '@angular/core';
import {AuthGuardService} from "../Authentification/auth-guard.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Client} from "../../models/Client";
import {Restaurant} from "../../models/Restaurant";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  client: Client;

  constructor(private authService: AuthGuardService,
              private angularFirestore: AngularFirestore,
              private _snackBar: MatSnackBar) {
  }

  addFavoriteRestaurant(restaurant: Restaurant) {
    if (!this.authService.isConnected) this.authService.getError('notAuth')
    else {

      // @ts-ignore
      if (this.authService.currentUser.favoritRestaurents.filter((r) => {
        return r.id == restaurant.id
      }).length == 0) {
        this.authService.currentUser.favoritRestaurents.push(restaurant)
        this.angularFirestore.collection('client').doc(this.authService.currentUser.id).set(this.authService.currentUser).then(res => {
          this._snackBar.open('restaurant ajouté aux favoris!', '', {
            duration: 3000,
            panelClass: 'orange-snackbar',
            horizontalPosition: 'center',

          });
        })
      } else {
        // @ts-ignore
        this.authService.currentUser.favoritRestaurents = this.authService.currentUser.favoritRestaurents.filter((r) => {
          return r.id != restaurant.id
        })
        this.angularFirestore.collection('client').doc(this.authService.currentUser.id).set(this.authService.currentUser).then(res => {
          this._snackBar.open('restaurant suprimé des favoris!', '', {
            duration: 3000,
            panelClass: 'orange-snackbar',
            horizontalPosition: 'center',

          });
        })
      }
    }
  }

}
