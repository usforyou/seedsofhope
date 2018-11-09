import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-confirmation',
  templateUrl: './account-confirmation.component.html',
  styleUrls: ['./account-confirmation.component.css']
})
export class AccountConfirmationComponent implements OnInit {
  model: any = {};
  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.confirmAccount();
  }
  confirmAccount(){
    console.log('Confirming ...')
    this.route.queryParams.subscribe(params => {
      console.log('params: ', params)
        this.model.email = decodeURIComponent(params.email).replace(' ', '+') ;
        this.model.token = decodeURIComponent(params.token);
      });
    this.authService.confirmAccount(this.model)
      .subscribe(resp => {
        if(resp.successful){
          this.alertService.success('Your account has been confirmed. Please login to continue')
          this.router.navigate(['/login']);
        }
        else{
          this.alertService.error(resp.message);
        }
      }, err => {
        this.alertService.error(err.message);
      })
  }
}
