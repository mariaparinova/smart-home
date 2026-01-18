import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLayoutPicker } from './card-layout-picker';

describe('CardForm', () => {
  let component: CardLayoutPicker;
  let fixture: ComponentFixture<CardLayoutPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardLayoutPicker],
    }).compileComponents();

    fixture = TestBed.createComponent(CardLayoutPicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
