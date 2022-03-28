import { Injectable } from '@angular/core';
import {ErrorComponent} from "../../components/error/error.component";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InternetService {

  isOnline: BehaviorSubject<boolean>

  constructor() {
    this.isOnline = new BehaviorSubject<boolean>(true)
  }

  checkInternet(){
    if (!navigator.onLine) {
      this.isOnline.next(false)
      return
    }
    // Honteusement volé : https://thewebdev.info/2022/02/09/how-to-check-if-server-is-online-with-javascript/
    (async () => {
      const url = 'https://letseat-bc283.web.app/'
      const controller = new AbortController();
      const signal = controller.signal;
      const options : RequestInit = {
        mode: 'no-cors',
        signal
      };
      await fetch(url, options).then(()=> {this.isOnline.next(false)})
      setTimeout(() => {
        controller.abort()
      }, 3000)
    })()
    this.isOnline.next(true)
  }
}
