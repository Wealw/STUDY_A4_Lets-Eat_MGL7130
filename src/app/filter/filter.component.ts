import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  areFilterDisplayed = false

  constructor() { }

  ngOnInit(): void {
  }

  toggleFilter(){
    this.areFilterDisplayed = ! this.areFilterDisplayed
  }

}
