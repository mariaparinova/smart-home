import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCardDevice } from './single-card-device';

describe('Device', () => {
  let component: SingleCardDevice;
  let fixture: ComponentFixture<SingleCardDevice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCardDevice],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleCardDevice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
