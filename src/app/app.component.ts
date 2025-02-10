import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MyEMIPlanComponent } from './my-emi-plan/my-emi-plan.component';
import { PayEMIComponent } from './pay-emi/pay-emi.component';
import { NewEMIPlanFormComponent } from './new-emi-plan-form/new-emi-plan-form.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MyEMIPlanComponent,
    PayEMIComponent,
    NewEMIPlanFormComponent,
    HomeComponent,
    LoginComponent,
    CustomerDashboardComponent,

    RegisterComponent,
    CustomerLoginComponent,
  ],
})
export class AppComponent {
  title = 'EMI Management System';
}
