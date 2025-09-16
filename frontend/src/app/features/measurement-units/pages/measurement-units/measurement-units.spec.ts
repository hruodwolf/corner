import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementUnits } from './measurement-units';

describe('MeasurementUnits', () => {
  let component: MeasurementUnits;
  let fixture: ComponentFixture<MeasurementUnits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasurementUnits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasurementUnits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
