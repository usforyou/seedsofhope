import { Injectable } from '@angular/core';
import {getAppID} from '../config/socialLoginConfig'

@Injectable({
  providedIn: 'root'
})
export class SocialAuthService {
  FB: any;
  constructor() {
    this.setupFacebook();
  }
  setupLinkedIn(){
    
  }
  setupFacebook(){
    (<any>window).fbAsyncInit = () => {
     console.log('initializing facebook...')
      
      this.FB.init({
        appId: getAppID('facebook'),
        //autoLogAppEvents : true,
        xfbml: false,
        version: 'v2.9'
      });
      this.FB.AppEvents.logPageView();
    };

  //   (function (d, s, id) {
  //     let js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) { return; }
  //     js = d.createElement(s); js.id = id;
  //     js.src = "//connect.facebook.net/en_US/sdk.js";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   }(document, 'script', 'facebook-jssdk'));
  }
}
