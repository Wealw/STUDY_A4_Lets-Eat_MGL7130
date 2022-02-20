import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {faEllipsisV, faFilter, faSearch} from '@fortawesome/free-solid-svg-icons'
import {OptionComponent} from "../option/option.component";
import {FilterComponent} from "../filter/filter.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChildren(OptionComponent) options: QueryList<OptionComponent>
  @ViewChildren(FilterComponent) filters: QueryList<FilterComponent>
  isSearchBarEnable = true
  displayBackButton = false
  faEllipsisV = faEllipsisV
  faFilter = faFilter
  faSearch = faSearch
  option: OptionComponent | undefined;
  filter: FilterComponent | undefined

  constructor() {

  }

  ngOnInit(): void {
  }



  disableSearchBar() {
    this.isSearchBarEnable = false;
  }

  enableSearchBar() {
    this.isSearchBarEnable = true;
  }

  disableBackButton(){
    this.displayBackButton = false
  }

  enableBackButton(){
    this.displayBackButton = true
  }



}

