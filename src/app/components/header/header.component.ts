import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {faEllipsisV, faFilter, faSearch, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {OptionComponent} from "../option/option.component";
import {FilterComponent} from "../filter/filter.component";
import {RestaurantService} from "../../services/restaurant/restaurant.service";
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
  RoutesRecognized
} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChildren(OptionComponent) options: QueryList<OptionComponent>
  @ViewChildren(FilterComponent) filters: QueryList<FilterComponent>
  isSearchBarEnable = true
  faEllipsisV = faEllipsisV
  faFilter = faFilter
  faSearch = faSearch
  faArrowLeft = faArrowLeft
  option: OptionComponent | undefined;
  filter: FilterComponent | undefined
  searchEnabledRoute = ["/accueil"]

  constructor(private router: Router, public restaurantService : RestaurantService) {
    console.log(this.router.url)
    this.updateSearchBarDisplay()
    router.events.forEach((event) => {
      this.updateSearchBarDisplay()
    });
  }

  ngOnInit(): void {
  }

  updateSearchBarDisplay() {
    this.isSearchBarEnable = this.searchEnabledRoute.includes(this.router.url);
  }

  navigateToHome() {
    this.router.navigate([`accueil`])
  }
}
