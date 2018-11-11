import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alert } from 'selenium-webdriver';
import {map} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {SocialAuthService} from './social-auth.service';
import { getAppID } from '../config/socialLoginConfig';
import {URLConfig} from '../config/urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private secureUrl: string = URLConfig.getSecureApiUrl();
  //these sources will broadcast observables when user logs in or logs out
  private loggedInSource = new Subject<any>();
  private loggedOutSource = new Subject<any>();

  //these are the login/logout event streams that can be listened to
  loggedIn$ = this.loggedInSource.asObservable();
  loggedOut$ = this.loggedOutSource.asObservable();

  jwtHelper = new JwtHelperService()

  ngOnInit(){
    //this.socialAuth.setupFacebook();
  }
  constructor(
    private http: HttpClient, 
    private socialAuth: SocialAuthService) {
  }
  private storeUserInfo(login, authProvider){
    if (login.successful) {
      let authData: AuthData = {
        authenticated: login.successful,
        userId: login.userId,
        fullname: login.name,
        token: login.token,
        authProvider: authProvider
      }
      localStorage.setItem('currentUser', JSON.stringify(authData));

      //broadcast logged in observable (event stream)
      this.loggedInSource.next(login.name);
  }
}
  login(loginModel) {
    return this.http.post<any>(this.secureUrl + '/accounts/oauth/login',
      loginModel)
      .pipe(map(resp => {
        this.storeUserInfo(resp, 'local');
        return resp;
      }))
  }
  googleAuth(data){
    return this.http.post<any>(this.secureUrl + '/accounts/oauth/google',
    data)
    .pipe(map(resp => {
      this.storeUserInfo(resp, 'google');
      return resp;
    }))
  }

  facebookAuth(data){
  //   FB.getLoginStatus((response) => {
  //     if (response.status === 'connected') {
  //         console.log('fb_response: ', response)
  //     }
  //     else {
  //         FB.login((loginResponse)=>{
  //         console.log('login response: ', loginResponse)
  //         });
  //     }
  // });
    return this.http.post<any>(this.secureUrl + '/accounts/oauth/facebook',
    data)
    .pipe(map(resp => {
      console.log('facebook response: ', resp)
      this.storeUserInfo(resp, 'facebook');
      return resp;
    }))
  }
  //linkedInAuth(){
    // let linkedInUrl =
    //     'https://www.linkedin.com/oauth/v2/authorization' 
    //     + `?response_type=code&client_id=${getAppID('linkedIn')}`
    //     + '&redirect_uri=http://localhost:4200'
    //     + `&state=${Math.floor(Math.random() * 30)}`
    //     + '&scope=r_basicprofile%20r_emailaddress'
    //     + '&format=json'
    // return this.http.get(linkedInUrl)
    // .pipe(map(resp => {
    //   console.log('linkedIn auth response: ',resp);
    //   return resp;
    // }))

    // return this.http.get<any>(this.url + '/accounts/oauth/linkedIn')
    // .pipe(map(resp => {
    //   console.log('linkedIn response: ', resp)
    //   // this.storeUserInfo(resp, 'linkedIn');
    //   return resp;
    // }))
    
  //}
  linkedInAuth(data){
    return this.http.post<any>(this.secureUrl + '/accounts/oauth/linkedIn',
    data)
    .pipe(map(resp => {
      this.storeUserInfo(resp, 'linkedIn');
      return resp;
    }))
  }
  register(signupModel) {
    return this.http.post<any>(this.secureUrl + '/accounts/oauth/register',
      signupModel)
      .pipe(map(resp => {
        return resp;
      }))
  }
  confirmAccount(data) {
    console.log('conf service data: ', data)
    return this.http.post<any>(this.secureUrl + '/accounts/oauth/confirm-account',
      data)
      .pipe(map(resp => {
        return resp;
      }))
  }
  resendComfirmationToken(email) {
    return this.http.post<any>(this.secureUrl + '/accounts/oauth/resend-confimation',
      {email: email})
      .pipe(map(resp => {
        return resp;
      }))
  }
  logout() {
    return this.http.get<any>(this.secureUrl + '/accounts/oauth/logout')
      .pipe(map(resp => {
        if (resp.successful) {
          var authProvider = JSON.parse(localStorage.getItem('currentUser')).authProvider;
          localStorage.removeItem('currentUser');
          switch(authProvider){
            case 'facebook': 
            //   FB.getLoginStatus(response => {
            //     if (response.status === 'connected') {
            //       FB.logout(logoutResp => {

            //       })
            //     }
            // })
            break;
            case 'google': 
              
            break;
        }

          //broadcast logged out observable (event)
          this.loggedOutSource.next(true);
        }
        return resp;
      }))
  }
  getAuthedUser(){
    let authData: AuthData = JSON.parse(localStorage.getItem('currentUser'));
    if (authData && authData.token){
      //if the token is not yet expired
      if(!this.jwtHelper.isTokenExpired(authData.token)){
        return authData.fullname;
      }
    }
    localStorage.removeItem('currentUser');
    return null;
  }
  
  
}
interface AuthData {
  authenticated: Boolean
  userId: string,
  fullname: string,
  token: string,
  authProvider: string
}
