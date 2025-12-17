import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiCardSensor } from './multi-card-sensor';

describe('Sensor', () => {
  let component: MultiCardSensor;
  let fixture: ComponentFixture<MultiCardSensor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiCardSensor],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiCardSensor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
