import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchIcon = faSearch;
  searchText: string;
  searchInputVisible: boolean = false;
  authenticated = false;
  firstname: String;
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {

    //subscribe to user login events
    this.authService.loggedIn$.subscribe(name => {
      this.authenticated = true;
      this.firstname = name.split(' ')[0];
    })

    //subscribe to user logout events
    this.authService.loggedOut$.subscribe(loggedOut => {
      if (loggedOut) {
        this.authenticated = false;
      }
    })
  }

  ngOnInit() {
    //update user info whenever the page is refreshed
    this.updateAuthInfo();
  }

  //if user is logged in, get full name from auth store (localStorage)
  updateAuthInfo() {
    let authedUser = this.authService.getAuthedUser();
    if (authedUser) {
      this.firstname = authedUser.split(' ')[0];
      this.authenticated = true;
    }
  }

  greet() {
    var today = new Date()
    var hours = today.getHours()

    if (hours < 12) {
      return 'Good morning '
    } else if (hours < 18) {
      return 'Good afternoon '
    } else {
      return 'Good evening '
    }
  }

  logout() {
    this.authService.logout()
      .subscribe(data => {
        this.alertService.success("You've successfully logged out!");
        this.router.navigate(["/login"]);
      }, err => {
        console.log('logout error: ', err)
        if (err.error.title === 'TokenExpired') {
          this.alertService.success("You've successfully logged out!");
          this.router.navigate(["/login"]);
        }
        else {
          this.alertService.error(err.error.message);
        }
      })
  }

  search() {
    if (this.searchInputVisible) {
      if (this.searchText) {
        console.log('searching for... ' + this.searchText);
      }
    }
    this.searchText = "";
    this.searchInputVisible = !this.searchInputVisible;
  }

}
