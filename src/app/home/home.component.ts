import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [RouterModule, LogoutComponent],
})
export class HomeComponent {
  title = 'Welcome to the EMI Management System';
}
