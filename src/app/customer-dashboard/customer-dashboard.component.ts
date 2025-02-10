import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
  standalone: true,
  imports: [RouterModule, LogoutComponent],
})
export class CustomerDashboardComponent {
  title = 'Welcome to the Customer Dashboard';
}
