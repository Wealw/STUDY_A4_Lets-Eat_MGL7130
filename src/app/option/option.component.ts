import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  areOptionOpened = false

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleOption() {
    this.areOptionOpened = !this.areOptionOpened
  }
}
