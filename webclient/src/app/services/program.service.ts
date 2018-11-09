import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {URLConfig} from '../config/urls';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(
    private http: HttpClient
  ) { }

  getProgramById(programId: string){
    return this.http.get<any>(URLConfig.getApiUrl() + '/programs')
      .pipe(map(resp => {
        return resp;
      }))
  }
  getPrograms(searchKeyword: string){
    return this.http.get<any>(URLConfig.getApiUrl() + '/programs')
      .pipe(map(resp => {
        return resp;
      }))
  }
}
