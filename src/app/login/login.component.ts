import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
})
export class LoginComponent {
  loginData = {
    username: '',
    password: '',
  };
  errorMessage = '';
  private baseUrl = 'http://localhost:7091/v1';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.login(this.loginData).subscribe(
      (response: any) => {
        const authorities = response.authorities.map(
          (auth: any) => auth.authority
        );
        if (authorities.includes('BANK MANAGER')) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Access denied. Only bank managers can log in.';
        }
      },
      (error: any) => {
        this.errorMessage = 'Login failed';
      }
    );
  }

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }

  navigateToCustomerLogin() {
    this.router.navigate(['/customer-login']);
  }
}
