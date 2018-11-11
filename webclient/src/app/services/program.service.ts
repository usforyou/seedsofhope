import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {URLConfig} from '../config/urls';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  url: string = URLConfig.getApiUrl();
  constructor(
    private http: HttpClient
  ) { }

  getProgramById(programId: string){
    return this.http.get<any>(this.url + '/programs/' + programId)
      .pipe(map(resp => {
        return resp;
      }))
  }
  getPrograms(searchKeyword: string){
    let urlString = this.url + '/programs' + (searchKeyword? 'kw=' + searchKeyword: '');
    return this.http.get<any>(urlString)
      .pipe(map(resp => {
        return resp;
      }))
  }
}
