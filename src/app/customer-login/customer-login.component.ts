import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router'; // Import RouterModule
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule], // Add RouterModule here
})
export class CustomerLoginComponent {
  loginData = {
    username: '',
    password: ''
  };
  errorMessage = '';
  private baseUrl = 'http://localhost:7091/v1';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.login(this.loginData).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/customer-dashboard']); // Navigate to customer dashboard
      },
      (error: any) => {
        this.errorMessage = 'Login failed';
      }
    );
  }

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}