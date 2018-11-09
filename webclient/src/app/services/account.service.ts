import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {URLConfig} from '../config/urls';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }
  getUser(){
    //var authProvider = JSON.parse(localStorage.getItem('currentUser')).authProvider;
    return this.http.get<any>(URLConfig.getApiUrl())
      .pipe(map(resp => {
        return resp;
      }))
  }
}
