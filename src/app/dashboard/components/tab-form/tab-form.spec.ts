import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabForm } from './tab-form';

describe('TabNameForm', () => {
  let component: TabForm;
  let fixture: ComponentFixture<TabForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TabForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
