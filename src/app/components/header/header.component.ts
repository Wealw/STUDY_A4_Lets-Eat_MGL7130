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
  // Récupère l'instance des sous composant
  @ViewChildren(OptionComponent) options: QueryList<OptionComponent>
  option: OptionComponent | undefined;
  // Initialise l'état du menu de naviaation
  isSearchBarEnable = true
  areFilterDisplayed = false
  searchEnabledRoute = ["/accueil"]
  // Instancie les éléments graphique de FontAwesome
  faEllipsisV = faEllipsisV
  faFilter = faFilter
  faSearch = faSearch
  faArrowLeft = faArrowLeft

  constructor(private router: Router, public restaurantService : RestaurantService) {
    this.updateSearchBarDisplay()
    // noinspection JSIgnoredPromiseFromCall
    router.events.forEach((): void => {
      this.updateSearchBarDisplay()
    }) ;
  }

  ngOnInit(): void {
  }

  // Met à jour l'état de la barre de recherche en fonction de la route
  updateSearchBarDisplay() {
    console.log(this.router.url)
    this.isSearchBarEnable = this.searchEnabledRoute.includes(this.router.url);
  }

  // Permet de revenir à l'écran d'accueil
  navigateToHome() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([`accueil`])
  }

  // Permet de basculer l'état d'affichage des filtres
  toggleFilter(){
    this.areFilterDisplayed = ! this.areFilterDisplayed
  }

  // Récupère la valeur d'un champ de texte pour réaliser un two-way binding
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
