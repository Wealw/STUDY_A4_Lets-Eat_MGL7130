import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs'
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {environment} from "../../../environments/environment.prod";
import {AngularFirestore} from "@angular/fire/compat/firestore";
@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject<any>(null);
  constructor(private angularFireMessaging: AngularFireMessaging, private angularFirestore : AngularFirestore) {
  }
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey}).then(
      (currentToken) => {
        if (currentToken) {
          // noinspection JSIgnoredPromiseFromCall
          this.angularFirestore.collection('deviceId').doc(currentToken).set({deviceId : currentToken})
        }
      }).catch((_) => {
    });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      this.currentMessage.next(payload);
    });
  }
}
