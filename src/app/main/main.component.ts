import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  //Google maps option instance : will be used in the future point display system
  mapOptions: google.maps.MapOptions = {
    center: { lat: 45.505423, lng: -73.6594142 },
    zoom : 11,
    disableDefaultUI: true,
  }
  markers = [
    {position: { lat: 45.525423, lng: -73.6504145 }, label: "mcdo", icon: "assets/icons/icon-72x72.png"},
    {position: { lat: 45.545429, lng: -73.6512146 }, label: "mcdo", icon: "assets/icons/icon-72x72.png"},
    {position: { lat: 45.503433, lng: -73.6570132 }, label: "mcdo", icon: "assets/icons/icon-72x72.png"},
    {position: { lat: 45.595483, lng: -73.6588182 }, label: "mcdo", icon: "assets/icons/icon-72x72.png"},
    {position: { lat: 45.515413, lng: -73.6541140 }, label: "mcdo", icon: "assets/icons/icon-72x72.png"},
  ]
  marker = {

  }

  constructor() { }

  ngOnInit(): void {
  }

}
