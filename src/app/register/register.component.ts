import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  private baseUrl = 'http://localhost:7091/v1';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    const signupData = {
      username: this.username,
      password: this.password,
      roles: 'CUSTOMER',
    };

    console.log('Sending signup request:', signupData);

    this.signup(signupData).subscribe(
      (response: any) => {
        console.log('Signup successful:', response);
        this.router.navigate(['/customer-login']); // Navigate to customer login page
      },
      (error: any) => {
        console.error('Signup error:', error);
        this.errorMessage = error.error?.message || 'Signup failed';
      }
    );
  }

  signup(signupData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, signupData);
  }

  navigateToSignIn() {
    this.router.navigate(['/customer-login']);
  }

  navigateToManagerLogin() {
    this.router.navigate(['/login']);
  }
}
