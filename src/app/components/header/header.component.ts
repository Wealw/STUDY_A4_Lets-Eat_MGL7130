import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {faEllipsisV, faFilter, faSearch, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {OptionComponent} from "../option/option.component";
import {RestaurantService} from "../../services/restaurant/restaurant.service";
import {
  Router
} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChildren(OptionComponent) options: QueryList<OptionComponent>
  isSearchBarEnable = true
  areFilterDisplayed = false

  faEllipsisV = faEllipsisV
  faFilter = faFilter
  faSearch = faSearch
  faArrowLeft = faArrowLeft
  option: OptionComponent | undefined;
  searchEnabledRoute = ["/accueil"]

  constructor(private router: Router, public restaurantService : RestaurantService) {
    console.log(this.router.url)
    this.updateSearchBarDisplay()
    // noinspection JSIgnoredPromiseFromCall
    router.events.forEach((): void => {
      this.updateSearchBarDisplay()
    }) ;
  }

  ngOnInit(): void {
  }

  updateSearchBarDisplay() {
    this.isSearchBarEnable = this.searchEnabledRoute.includes(this.router.url);
  }

  navigateToHome() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([`accueil`])
  }

  toggleFilter(){
    this.areFilterDisplayed = ! this.areFilterDisplayed
  }
}
