import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {AuthGuardService} from "./services/auth-guard.service";

//import components for routing
import {HomeComponent} from "./components/misc/home/home.component";
import {ProgramListingComponent} from "./components/training-program/program-listing/program-listing.component";
import {ProgramDetailsComponent} from "./components/training-program/program-details/program-details.component";
import {TrainerListingComponent} from "./components/trainer/trainer-listing/trainer-listing.component";
import {TraineeListingComponent} from "./components/trainee/trainee-listing/trainee-listing.component";
import {LoginComponent} from "./components/account/login/login.component";
import {AccountConfirmationComponent} from "./components/account/account-confirmation/account-confirmation.component";
import {AccountDetailsComponent} from "./components/account/account-details/account-details.component";
import { PrivacyComponent } from './components/misc/privacy/privacy.component';
import { TermsComponent } from './components/misc/terms/terms.component';
import { TrainerDetailsComponent } from './components/trainer/trainer-details/trainer-details.component';
import { TraineeDetailsComponent } from './components/trainee/trainee-details/trainee-details.component';
import { TransactionHistoryComponent } from './components/account/transaction-history/transaction-history.component';
import { FaqsComponent } from './components/misc/faqs/faqs.component';
import { CreateProgramComponent } from './components/training-program/create-program/create-program.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'privacy-policy', component: PrivacyComponent},
  {path: 'terms-and-conditions', component: TermsComponent},
  {path: 'faqs', component: FaqsComponent},
  {path: 'programs/program-listing', component: ProgramListingComponent},
  {path: 'programs/create-program', component: CreateProgramComponent, canActivate: [AuthGuardService] },
  {path: 'programs/program-details', component: ProgramDetailsComponent},
  {path: 'trainer-listing', component: TrainerListingComponent},
  {path: 'trainer-details', component: TrainerDetailsComponent},
  {path: 'trainee-listing', component: TraineeListingComponent, canActivate: [AuthGuardService]},
  {path: 'trainee-details', component: TraineeDetailsComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'account-confirmation', component: AccountConfirmationComponent},
  {path: 'account-details', component: AccountDetailsComponent, canActivate: [AuthGuardService]},
  {path: 'transaction-history', component: TransactionHistoryComponent, canActivate: [AuthGuardService]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
