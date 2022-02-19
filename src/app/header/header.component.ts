import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {faEllipsisV, faFilter, faSearch} from '@fortawesome/free-solid-svg-icons'
import {OptionComponent} from "../option/option.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChildren(OptionComponent) options: QueryList<OptionComponent>
  isSearchBarEnable = true
  option: OptionComponent | undefined;

  constructor() {

  }

  ngOnInit(): void {
  }

  faEllipsisV = faEllipsisV
  faFilter = faFilter
  faSearch = faSearch

  disableSearchBar() {
    this.isSearchBarEnable = false;
  }

  enableSearchBar() {
    this.isSearchBarEnable = true;
  }

}

