import { Component, OnInit } from '@angular/core';
import { AccountService } from "../../../services/account.service";
import { User } from '../../../models/user';
import { faCheck, faTimesCircle, faEdit, faUpload} 
  from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-account',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  user: User;
  checkIcon = faCheck;
  crossIcon = faTimesCircle;
  editIcon = faEdit;
  uploadIcon = faUpload;
  constructor(private acctService: AccountService) { }

  ngOnInit() {
    this.acctService.getUser().subscribe(_user => {
      this.user = _user;
    })
  }

  editPhoto(){
    console.log('editing photo...')
  }
  uploadPhoto(){
    console.log('uploading photo...')
  }
}
