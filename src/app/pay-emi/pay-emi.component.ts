import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmiPaymentService } from '../emi-payment.service'; // Update the path as needed

@Component({
  selector: 'app-pay-emi',
  templateUrl: './pay-emi.component.html',
  styleUrls: ['./pay-emi.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class PayEMIComponent implements OnInit {
  paymentDetails: any = {
    customerId: '',
    loanPlanId: '',
    amount: '',
    paymentDate: '',
    lateFee: '',
    paymentMethodId: '1', // Default to Card
  };
  acknowledgement: string = '';
  emiStatus: string = '';
  paymentHistory: any[] = [];
  minDate!: string; // Use definite assignment assertion operator

  constructor(
    private emiPaymentService: EmiPaymentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setDefaultPaymentDate();
    this.checkEMIStatus();
    this.fetchPaymentHistory();
  }

  setDefaultPaymentDate() {
    const today = new Date().toISOString().split('T')[0];
    this.paymentDetails.paymentDate = today;
    this.minDate = today;
    this.calculateLateFee();
  }

  calculateLateFee() {
    const paymentDate = new Date(this.paymentDetails.paymentDate);
    const dayOfMonth = paymentDate.getDate();

    const daysLate = dayOfMonth > 5 ? dayOfMonth - 5 : 0;
    const lateFee = daysLate * 0.025 * this.paymentDetails.amount;
    this.paymentDetails.lateFee = lateFee.toFixed(2); // Format to 2 decimal places

    // Update EMI status to Defaulted if there is a late fee
    if (lateFee > 0) {
      this.emiStatus = 'Defaulted';
    }
  }

  checkEMIStatus() {
    this.emiPaymentService
      .getEmiStatus(
        this.paymentDetails.customerId,
        this.paymentDetails.loanPlanId
      )
      .subscribe(
        (response: any) => {
          this.emiStatus = response.emiStatus;
        },
        (error: any) => {
          console.error('Failed to fetch EMI status:', error);
        }
      );
  }

  fetchPaymentHistory() {
    this.emiPaymentService
      .getPaymentHistory(
        this.paymentDetails.customerId,
        this.paymentDetails.loanPlanId
      )
      .subscribe(
        (response: any) => {
          this.paymentHistory = response;
        },
        (error: any) => {
          console.error('Failed to fetch payment history:', error);
        }
      );
  }

  payEMI() {
    // Ensure the latest status is checked before payment
    this.checkEMIStatus();

    if (this.emiStatus === 'FullyPaid') {
      this.acknowledgement = 'Your payment is already completed.';
      return;
    }

    const id = localStorage.getItem('id');

    const payload = {
      amount: this.paymentDetails.amount,
      paymentDate: this.paymentDetails.paymentDate,
      lateFee: this.paymentDetails.lateFee,
      paymentMethodId: this.paymentDetails.paymentMethodId,
      emisId: id,
    };

    this.emiPaymentService
      .makePayment(
        this.paymentDetails.customerId,
        this.paymentDetails.loanPlanId,
        payload
      )
      .subscribe(
        (response: any) => {
          this.acknowledgement = 'EMI payment successful!';
          // Refresh EMI status and payment history after payment
          this.checkEMIStatus();
          this.fetchPaymentHistory();
        },
        (error: any) => {
          this.acknowledgement = 'Failed to process EMI payment.';
        }
      );
  }

  navigateHome() {
    this.router.navigate(['/']);
  }
}
