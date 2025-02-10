import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEMIPlanComponent } from './my-emi-plan.component';

describe('MyEmiPlanComponent', () => {
  let component: MyEMIPlanComponent;
  let fixture: ComponentFixture<MyEMIPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyEMIPlanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyEMIPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
