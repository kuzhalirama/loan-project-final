// import { Component, OnInit } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   ReactiveFormsModule,
// } from '@angular/forms';
// import {
//   HttpClientModule,
//   HttpClient,
//   HttpHeaders,
// } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-new-emi-plan-form',
//   templateUrl: './new-emi-plan-form.component.html',
//   styleUrls: ['./new-emi-plan-form.component.css'],
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
// })
// export class NewEMIPlanFormComponent implements OnInit {
//   form: FormGroup;
//   acknowledgement: string = '';
//   errorMessage: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private http: HttpClient,
//     private router: Router
//   ) {
//     this.form = this.fb.group({
//       customerId: ['', Validators.required],
//       loanPlanId: ['', Validators.required],
//       emiAmount: ['', [Validators.required, Validators.min(1)]],
//       emiStart: ['', Validators.required],
//       numberEmis: ['', Validators.required],
//       customerName: ['', Validators.required],
//       customerPhone: [
//         '',
//         [Validators.required, Validators.pattern('^[0-9]{10}$')],
//       ],
//       customerAddress: ['', Validators.required],
//       customerPan: [
//         '',
//         [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')],
//       ],
//       emiStatus: ['OnGoing', Validators.required],
//     });
//   }

//   ngOnInit(): void {}

//   private fnReadToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   private getAuthHeaders(): HttpHeaders {
//     const token = this.fnReadToken();
//     return new HttpHeaders().set('Authorization', `Bearer ${token}`);
//   }

//   onSubmit() {
//     if (this.form.valid) {
//       this.createEMIPlan();
//     } else {
//       this.errorMessage = 'Please fill out all required fields correctly.';
//     }
//   }
//   createEMIPlan() {
//     const emiPlan = this.form.value;
//     const payload = {
//       customerId: emiPlan.customerId,
//       loanPlanId: emiPlan.loanPlanId,
//       emiAmount: emiPlan.emiAmount,
//       emiStart: emiPlan.emiStart,
//       numberOfEMIs: emiPlan.numberEmis,
//       customerName: emiPlan.customerName,
//       customerPhone: emiPlan.customerPhone,
//       customerAddress: emiPlan.customerAddress,
//       customerPAN: emiPlan.customerPan,
//       emiStatus: emiPlan.emiStatus,
//     };
//     console.log('Form Valid:', this.form.valid);
//     console.log('Form Submitted', emiPlan);
//     const headers = this.getAuthHeaders();
//     console.log(headers);
//     this.http
//       .post('http://localhost:7091/api/emiplans/add', payload, { headers })
//       .subscribe(
//         (response: any) => {
//           this.acknowledgement = 'EMI Plan created successfully!';
//           this.errorMessage = '';
//           console.log('EMI Plan created:', response);
//         },
//         (error) => {
//           console.error('Error creating EMI Plan:', error);
//           if (
//             error.status === 404 &&
//             error.error === 'Customer has more than 2 active loans'
//           ) {
//             this.errorMessage = 'Customer has more than 2 active loans.';
//           } else {
//             this.errorMessage = error.error || 'Failed to create EMI Plan.';
//           }
//           this.acknowledgement = '';
//         }
//       );
//   }

//   navigateHome() {
//     this.router.navigate(['/']);
//   }
// }

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Custom validator function for future or today's date
function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null; // Let required validator handle empty values
    }
    const selectedDate = new Date(value);
    if (isNaN(selectedDate.getTime())) {
      return { invalidDate: true };
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate < today ? { pastDate: true } : null;
  };
}

@Component({
  selector: 'app-new-emi-plan-form',
  templateUrl: './new-emi-plan-form.component.html',
  styleUrls: ['./new-emi-plan-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
})
export class NewEMIPlanFormComponent implements OnInit {
  form: FormGroup;
  acknowledgement: string = '';
  errorMessage: string = '';
  minDate: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      customerId: ['', Validators.required],
      loanPlanId: ['', Validators.required],
      emiAmount: ['', [Validators.required, Validators.min(1)]],
      emiStart: ['', [Validators.required, futureDateValidator()]],
      numberEmis: ['', Validators.required],
      customerName: ['', Validators.required],
      customerPhone: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      customerAddress: ['', Validators.required],
      customerPan: [
        '',
        [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')],
      ],
      emiStatus: ['OnGoing', Validators.required],
    });

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {}

  private fnReadToken(): string | null {
    return localStorage.getItem('token');
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.fnReadToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  onSubmit() {
    if (this.form.valid) {
      this.createEMIPlan();
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  createEMIPlan() {
    const emiPlan = this.form.value;
    const payload = {
      customerId: emiPlan.customerId,
      loanPlanId: emiPlan.loanPlanId,
      emiAmount: emiPlan.emiAmount,
      emiStart: emiPlan.emiStart,
      numberOfEMIs: emiPlan.numberEmis,
      customerName: emiPlan.customerName,
      customerPhone: emiPlan.customerPhone,
      customerAddress: emiPlan.customerAddress,
      customerPAN: emiPlan.customerPan,
      emiStatus: emiPlan.emiStatus,
    };
    console.log('Form Valid:', this.form.valid);
    console.log('Form Submitted', emiPlan);
    const headers = this.getAuthHeaders();
    console.log(headers);
    this.http
      .post('http://localhost:7091/api/emiplans/add', payload, { headers })
      .subscribe(
        (response: any) => {
          this.acknowledgement = 'EMI Plan created successfully!';
          this.errorMessage = '';
          console.log('EMI Plan created:', response);
        },
        (error) => {
          console.error('Error creating EMI Plan:', error);
          if (
            error.status === 404 &&
            error.error === 'Customer has more than 2 active loans'
          ) {
            this.errorMessage = 'Customer has more than 2 active loans.';
          } else {
            this.errorMessage = error.error || 'Failed to create EMI Plan.';
          }
          this.acknowledgement = '';
        }
      );
  }

  navigateHome() {
    this.router.navigate(['/']);
  }
}
