import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayEMIComponent } from './pay-emi.component';

describe('PayEMIComponent', () => {
  let component: PayEMIComponent;
  let fixture: ComponentFixture<PayEMIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayEMIComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PayEMIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
