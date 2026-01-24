import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardForm } from './dashboard-form';

describe('NewDashboardForm', () => {
  let component: DashboardForm;
  let fixture: ComponentFixture<DashboardForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardForm],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
