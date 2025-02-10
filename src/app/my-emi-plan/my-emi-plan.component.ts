// import { Component } from '@angular/core';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-my-emi-plan',
//   templateUrl: './my-emi-plan.component.html',
//   styleUrls: ['./my-emi-plan.component.css'],
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule],
// })
// export class MyEMIPlanComponent {
//   customerId: string = '';
//   loanPlanId: string = '';
//   emiPlan: any = null;
//   paymentHistory: any[] = [];
//   showErrors: boolean = false;

//   constructor(private http: HttpClient, private router: Router) {}

//   searchEMIPlan() {
//     this.showErrors = !this.customerId || !this.loanPlanId;
//     if (this.showErrors) {
//       console.error('Customer ID and Loan Plan ID must not be null');
//       return;
//     }
//     console.log(
//       `Fetching EMI plan for Customer ID: ${this.customerId}, Loan Plan ID: ${this.loanPlanId}`
//     );
//     this.http
//       .get(
//         `http://localhost:7092/api/emiplans/${this.customerId}/${this.loanPlanId}`
//       )
//       .subscribe(
//         (data: any) => {
//           this.emiPlan = data;
//           localStorage.setItem('id', data.id);
//           if (!data) {
//             this.showErrors = true;
//           }
//         },
//         (error) => {
//           console.error('Error fetching EMI plan:', error);
//           this.showErrors = true;
//         }
//       );
//   }

//   viewPaymentHistory() {
//     if (!this.customerId || !this.loanPlanId) {
//       console.error('Customer ID and Loan Plan ID must not be null');
//       return;
//     }
//     console.log(
//       `Fetching payment history for Customer ID: ${this.customerId}, Loan Plan ID: ${this.loanPlanId}`
//     );
//     this.http
//       .get(
//         `http://localhost:7092/api/emiplans/${this.customerId}/${this.loanPlanId}/paymenthistory`
//       )
//       .subscribe(
//         (data: any) => {
//           console.log('Payment history data:', data); // Log the response data
//           this.paymentHistory = data;
//           if (this.paymentHistory.length === 0) {
//             this.showErrors = true;
//           }
//         },
//         (error) => {
//           console.error('Error fetching payment history:', error);
//           this.showErrors = true;
//         }
//       );
//   }

//   navigateHome() {
//     this.router.navigate(['/customer-dashboard']);
//   }
// }

import { Component } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-emi-plan',
  templateUrl: './my-emi-plan.component.html',
  styleUrls: ['./my-emi-plan.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class MyEMIPlanComponent {
  customerId: string = '';
  loanPlanId: string = '';
  emiPlan: any = null;
  paymentHistory: any[] = [];
  showErrors: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  private fnReadToken(): string | null {
    return localStorage.getItem('token');
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.fnReadToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  searchEMIPlan() {
    this.showErrors = !this.customerId || !this.loanPlanId;
    if (this.showErrors) {
      console.error('Customer ID and Loan Plan ID must not be null');
      return;
    }
    console.log(
      `Fetching EMI plan for Customer ID: ${this.customerId}, Loan Plan ID: ${this.loanPlanId}`
    );
    const headers = this.getAuthHeaders();
    console.log(headers);
    this.http
      .get(
        `http://localhost:7091/api/emiplans/${this.customerId}/${this.loanPlanId}`,
        { headers }
      )
      .subscribe(
        (data: any) => {
          this.emiPlan = data;
          localStorage.setItem('id', data.id);
          if (!data) {
            this.showErrors = true;
          }
        },
        (error) => {
          console.error('Error fetching EMI plan:', error);
          this.showErrors = true;
        }
      );
  }

  viewPaymentHistory() {
    if (!this.customerId || !this.loanPlanId) {
      console.error('Customer ID and Loan Plan ID must not be null');
      return;
    }
    console.log(
      `Fetching payment history for Customer ID: ${this.customerId}, Loan Plan ID: ${this.loanPlanId}`
    );
    const headers = this.getAuthHeaders();
    console.log(headers);
    this.http
      .get(
        `http://localhost:7091/api/emiplans/${this.customerId}/${this.loanPlanId}/paymenthistory`,
        { headers }
      )
      .subscribe(
        (data: any) => {
          console.log('Payment history data:', data); // Log the response data
          this.paymentHistory = data;
          if (this.paymentHistory.length === 0) {
            this.showErrors = true;
          }
        },
        (error) => {
          console.error('Error fetching payment history:', error);
          this.showErrors = true;
        }
      );
  }

  navigateHome() {
    this.router.navigate(['/customer-dashboard']);
  }
}
