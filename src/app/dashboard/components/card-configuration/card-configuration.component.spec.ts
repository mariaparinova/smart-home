import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesCardConfiguration } from './card-configuration.component';

describe('EntitiesCardConfiguration', () => {
  let component: EntitiesCardConfiguration;
  let fixture: ComponentFixture<EntitiesCardConfiguration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntitiesCardConfiguration],
    }).compileComponents();

    fixture = TestBed.createComponent(EntitiesCardConfiguration);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
