import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';
import { AuthService as SocialAuthService, FacebookLoginProvider, 
  GoogleLoginProvider, LinkedinLoginProvider} from 'angular-6-social-login';
import { faFacebookF, faGooglePlusG, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  isLogin = true;
  submitBtnText = "Login";
  toggleBtnText = "Register";
  pageTitle = "Login";
  registerCall = "Do Not Have an Account? "
  errMessage = '';
  returnUrl: string;
  gmailIcon = faGooglePlusG;
  fbIcon = faFacebookF;
  linkedInIcon =faLinkedinIn

  // private emailRegex = new RegExp('[A-Za-z0-9._%+-]{2,}@[a-zA-Z]{1,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})');
  // private passwordRegex = new RegExp('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}');
  // private phoneNbrRegex = new RegExp('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private alertService: AlertService
    
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnURL'] || '/courses/my-courses';
  }

  private handleAuthError(btnText, msg?){
    this.alertService.error(msg);
    this.loading = false;
    this.submitBtnText = btnText;
  }

  toggleLogin(){
    if(this.isLogin){
      this.pageTitle = "Create a New Account";
      this.registerCall = "";
      this.toggleBtnText = "Back To Login";
      this.submitBtnText = "Register";
    }
    else{
      this.pageTitle = "Login";
      this.registerCall = "Do Not Have an Account? "
      this.toggleBtnText = "Register";
      this.submitBtnText = "Login";
    }
    this.isLogin = !this.isLogin;
  }
  submit(){
    if(this.isLogin){
      this.login();
    }
    else if(!this.isLogin){
      this.register();
    }
  }
  private handleLoginSuccess(resp){
    if(resp.successful){
      this.alertService.success('Login Successful!')
      this.router.navigate([this.returnUrl]);
    }
    else{
      this.handleAuthError("Login", resp.message);
    }
  }
  private handleLoginError(err){
    this.handleAuthError("Login", err.message);
  }
  gmail() {
    this.authService.logout();
    let googlePlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(googlePlatformProvider).then(
      (userData) => {
        this.authService.googleAuth(userData)
          .subscribe(data => this.handleLoginSuccess(data),
            err => this.handleLoginError(err))
      }
    );
  }
  linkedIn() {
    this.authService.logout();
    let linkedInProvider = LinkedinLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(linkedInProvider).then(
      (userData) => {
        this.authService.linkedInAuth(userData)
          .subscribe(data => this.handleLoginSuccess(data),
            err => this.handleLoginError(err))
      }
    );
  }
  facebook(){
    this.authService.logout();
    let fbPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      this.socialAuthService.signIn(fbPlatformProvider).then(
        (userData) => {
          this.authService.facebookAuth(userData)
          .subscribe(data => this.handleLoginSuccess(data), 
                 err => this.handleLoginError(err))
         }
      );
  }
  
  private login() {
    this.authService.logout();
    this.loading = true;
    this.submitBtnText = "Loging In... Please wait!";
    this.authService.login(this.model)
      .subscribe(data => this.handleLoginSuccess(data), 
                 err => this.handleLoginError(err))
  }
  private register(){
    this.authService.logout();
    this.loading = true;
    this.submitBtnText = "Creating account... Please wait!";
    this.authService.register(this.model)
      .subscribe(data => {
        if(data.successful){
          this.loading = false;
          this.alertService.success('Account Created! Please check your email to confirm account')
          this.toggleLogin();
        }
        else{
          this.handleAuthError("Register", data.message);
        }
      }, err => {
        this.handleAuthError("Register", err.message);
      })
  }
  
}
