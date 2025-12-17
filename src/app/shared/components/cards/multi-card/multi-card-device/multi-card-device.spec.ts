import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiCardDevice } from './multi-card-device';

describe('Device', () => {
  let component: MultiCardDevice;
  let fixture: ComponentFixture<MultiCardDevice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiCardDevice],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiCardDevice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
