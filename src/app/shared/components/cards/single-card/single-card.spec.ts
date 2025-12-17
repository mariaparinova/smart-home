import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCard } from './single-card';

describe('SingleDevice', () => {
  let component: SingleCard;
  let fixture: ComponentFixture<SingleCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCard],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
