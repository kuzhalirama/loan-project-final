import { Routes } from '@angular/router';
import { MyEMIPlanComponent } from './my-emi-plan/my-emi-plan.component';
import { PayEMIComponent } from './pay-emi/pay-emi.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { RegisterComponent } from './register/register.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewEMIPlanFormComponent } from './new-emi-plan-form/new-emi-plan-form.component';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
  { path: 'emi-plan', component: MyEMIPlanComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-emi-plan-form', component: NewEMIPlanFormComponent },
  { path: 'pay-emi', component: PayEMIComponent },
  { path: 'login', component: LoginComponent },
  { path: 'customer-login', component: CustomerLoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'customer-dashboard', component: CustomerDashboardComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
