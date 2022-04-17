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

  async checkInternet(){
    if (!navigator.onLine) {
      this.isOnline.next(false)
      return
    }
    // Honteusement volé : https://thewebdev.info/2022/02/09/how-to-check-if-server-is-online-with-javascript/
    const url = 'https://letseat-bc283.web.app/'
    const options : RequestInit = {
      mode: 'no-cors',
    };
    try {
      const response = await fetch(url, options)
      if (response.status != 200 && response.status != 0){
        this.isOnline.next(false);
        return
      }
    } catch (e) {
      this.isOnline.next(false);
      return
    }
    this.isOnline.next(true)
  }
}
