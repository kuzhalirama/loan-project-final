// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class EmiPaymentService {
//   private baseUrl = 'http://localhost:7092/api/emiplans';

//   constructor(private http: HttpClient) {}

//   getEmiStatus(customerId: string, loanPlanId: string): Observable<any> {
//     return this.http.get(`${this.baseUrl}/${customerId}/${loanPlanId}`);
//   }

//   getPaymentHistory(customerId: string, loanPlanId: string): Observable<any> {
//     return this.http.get(
//       `${this.baseUrl}/${customerId}/${loanPlanId}/paymenthistory`
//     );
//   }

//   makePayment(
//     customerId: string,
//     loanPlanId: string,
//     payload: any
//   ): Observable<any> {
//     return this.http.post(
//       `${this.baseUrl}/${customerId}/${loanPlanId}`,
//       payload
//     );
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmiPaymentService {
  private baseUrl = 'http://localhost:7091/api/emiplans';

  constructor(private http: HttpClient) {}

  private fnReadToken(): string | null {
    return localStorage.getItem('token');
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.fnReadToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getEmiStatus(customerId: string, loanPlanId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/${customerId}/${loanPlanId}`, {
      headers,
    });
  }

  getPaymentHistory(customerId: string, loanPlanId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(
      `${this.baseUrl}/${customerId}/${loanPlanId}/paymenthistory`,
      { headers }
    );
  }

  makePayment(
    customerId: string,
    loanPlanId: string,
    payload: any
  ): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(
      `${this.baseUrl}/${customerId}/${loanPlanId}`,
      payload,
      { headers }
    );
  }
}
