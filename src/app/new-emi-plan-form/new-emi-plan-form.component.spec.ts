import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEMIPlanFormComponent } from './new-emi-plan-form.component';

describe('NewEmiPlanFormComponent', () => {
  let component: NewEMIPlanFormComponent;
  let fixture: ComponentFixture<NewEMIPlanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEMIPlanFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewEMIPlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
