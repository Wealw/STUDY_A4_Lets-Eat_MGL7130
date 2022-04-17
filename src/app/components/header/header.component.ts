import {Component, ElementRef, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {RestaurantService} from "../../services/restaurant/restaurant.service";
import {Router} from '@angular/router';
import {AuthGuardService} from "../../services/Authentification/auth-guard.service";
import {Location} from "@angular/common";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Initialise l'état du menu de naviaation
  isSearchBarEnable = true
  areFilterDisplayed = false
  searchEnabledRoute = ["/"]
  // Instancie les éléments graphique de FontAwesome
  faSearch = faSearch
  areFilterInUse = false

  constructor(private router: Router,
              private _location: Location,
              public restaurantService: RestaurantService,
              private elementRef: ElementRef,
              public authService: AuthGuardService) {
    this.updateSearchBarDisplay()
    // noinspection JSIgnoredPromiseFromCall
    router.events.forEach((): void => {
      this.updateSearchBarDisplay()
    });
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.addEventListener("keyup", (event: { preventDefault: () => void; keyCode: any; }) => {
      event.preventDefault()
      if (event.keyCode === 13) {
        this.blurSearchBar()
        this.areFilterDisplayed = false
      }
    })

  }

  // Met à jour l'état de la barre de recherche en fonction de la route
  updateSearchBarDisplay() {
    this.isSearchBarEnable = this.searchEnabledRoute.includes(this.router.url);
  }

  // Permet de revenir à l'écran d'accueil
  back() {
    // noinspection JSIgnoredPromiseFromCall
    this._location.back();
    }

  // Permet de basculer l'état d'affichage des filtres
  toggleFilter() {
    this.areFilterInUse = this.checkIfFilterAreInUse();
    this.areFilterDisplayed = !this.areFilterDisplayed;
  }

  closeFilter() {
    this.areFilterInUse = this.checkIfFilterAreInUse();
    this.areFilterDisplayed = false
  }

  // Récupère la valeur d'un champ de texte pour réaliser un two-way binding
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  // Permet de revenir à l'écran d'accueil
  navigateToSignIn() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([`sign-in`])
  }

  signOut() {
    this.authService.signout().then(() => {
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['sign-in']);
      this.authService.checkAuthentification();
    });

  }

  navigateToSignUp() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([`sign-up`])
  }
  // Permet de revenir à l'écran Favoris
  navigateToFavoris() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([`favoris`])
  }

  navigateToAbout() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([`about`])
  }

  blurSearchBar() {
    this.areFilterInUse = this.checkIfFilterAreInUse();
    let searchBar = document.getElementById('search')
    if (searchBar) {
      searchBar.blur()
    }
  }

  blurSuggestion() {
    this.areFilterInUse = this.checkIfFilterAreInUse();
    let searchBar = document.getElementById('suggestion')
    if (searchBar) {
      searchBar.blur()
    }
  }

  selectItem(search : string){
    this.restaurantService.recherche.texte = search
    this.restaurantService.getAllRestaurants()
    this.blurSearchBar();
    this.blurSuggestion()
  }

  checkIfFilterAreInUse(){
    const textInUse = this.restaurantService.recherche.texte !== ""
    const distanceInUse = this.restaurantService.recherche.distance !== 100
    const prixMinInUse = this.restaurantService.recherche.prix_max !== undefined
    const prixMaxInUse = this.restaurantService.recherche.prix_min !== undefined
    const notationInUse = this.restaurantService.recherche.notation !== undefined
    const categorieInUse = !(this.restaurantService.recherche.categorie === undefined || this.restaurantService.recherche.categorie === "")
    return textInUse || distanceInUse || prixMaxInUse || prixMinInUse || notationInUse || categorieInUse
  }
}
