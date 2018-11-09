//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SocialLoginModule, AuthServiceConfig } from "angular-6-social-login";
import { AppRoutingModule } from './/app-routing.module';

//components
import { AppComponent } from './app.component';
import { ProgramListingComponent } from './components/training-program/program-listing/program-listing.component';
import { CreateProgramComponent } from './components/training-program/create-program/create-program.component';
import { ProgramDetailsComponent } from './components/training-program/program-details/program-details.component';
import { EditProgramComponent } from './components/training-program/edit-program/edit-program.component';
import { LoginComponent } from './components/account/login/login.component';
import { TraineeListingComponent } from './components/trainee/trainee-listing/trainee-listing.component';
import { TraineeDetailsComponent } from './components/trainee/trainee-details/trainee-details.component';
import { TrainerListingComponent } from './components/trainer/trainer-listing/trainer-listing.component';
import { TrainerDetailsComponent } from './components/trainer/trainer-details/trainer-details.component';
import { NavbarComponent } from './components/misc/navbar/navbar.component';
import { HomeComponent } from './components/misc/home/home.component';
import { AccountConfirmationComponent } from './components/account/account-confirmation/account-confirmation.component';
import { AccountDetailsComponent } from './components/account/account-details/account-details.component';
import { PrivacyComponent } from './components/misc/privacy/privacy.component';
import { TermsComponent } from './components/misc/terms/terms.component';
import { FaqsComponent } from './components/misc/faqs/faqs.component';
import { FooterComponent } from './components/misc/footer/footer.component';
import { AlertComponent } from './components/alert/alert.component';
import { getAuthServiceConfigs } from './config/socialLoginConfig';
import { TransactionHistoryComponent } from './components/account/transaction-history/transaction-history.component';
import { TransactionDetailsComponent } from './components/account/transaction-details/transaction-details.component';
import { EllipsisPipe } from './app.customPipes';


//services
import {AuthInterceptorService} from "./services/auth-interceptor.service";


@NgModule({
  declarations: [
    EllipsisPipe,
    AppComponent,
    ProgramListingComponent,
    CreateProgramComponent,
    ProgramDetailsComponent,
    EditProgramComponent,
    LoginComponent,
    TraineeListingComponent,
    TraineeDetailsComponent,
    TrainerListingComponent,
    TrainerDetailsComponent,
    NavbarComponent,
    HomeComponent,
    AccountDetailsComponent,
    AlertComponent,
    AccountConfirmationComponent,
    PrivacyComponent,
    TermsComponent,
    FooterComponent,
    TransactionHistoryComponent,
    FaqsComponent,
    TransactionDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SocialLoginModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptorService,multi: true},
    {provide: AuthServiceConfig, useFactory: getAuthServiceConfigs}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

