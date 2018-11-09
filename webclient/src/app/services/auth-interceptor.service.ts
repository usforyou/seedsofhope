import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, 
  HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of} from 'rxjs';
import { catchError, tap, retry} from 'rxjs/operators';
import { Router, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  state: RouterStateSnapshot;
  constructor(
    private router: Router
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if(currentUser && currentUser.token){
      request = request.clone({
        setHeaders: {
          Authorization: currentUser.token
        }
      })
    }
    return next.handle(request).pipe(
      //retry(3),
      tap(
        data => {},
        err => {
          if(err.status === 401){
            localStorage.removeItem('currentUser');
            this.router.navigate(['/login'])//, {queryParams: {returnURL: this.state.url}});
          }
        }
      )
      // catchError(err => {
      //   of([])
      // })
    )
  }
}
