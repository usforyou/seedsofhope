import { Component, OnInit } from '@angular/core';
import {faPhone, faEnvelope,faHome, faPrint, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faGooglePlusG,faLinkedinIn} from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  year: number = 2000;
  homeIcon = faHome;
  envolopeIcon = faEnvelope; 
  phoneIcon = faPhone; 
  printIcon = faPrint;
  locationIcon = faLocationArrow;

  facebook = faFacebookF;
  twitter = faTwitter;
  google= faGooglePlusG;
  linkedIn = faLinkedinIn
  constructor() { }

  ngOnInit() {
    this.year = (new Date()).getFullYear();
  }

}
