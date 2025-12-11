import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCardSensor } from './single-card-sensor';

describe('Sensor', () => {
  let component: SingleCardSensor;
  let fixture: ComponentFixture<SingleCardSensor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCardSensor],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleCardSensor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
