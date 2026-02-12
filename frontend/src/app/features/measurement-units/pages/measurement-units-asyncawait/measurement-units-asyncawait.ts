import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MeasurementUnit} from '../../../../core/models/measurement-unit.model';
import {MeasurementUnitService} from '../../services/measurement-unit.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-measurement-units-asyncawait',
  imports: [
    NgForOf,
    NgIf,
    JsonPipe
  ],
  templateUrl: './measurement-units-asyncawait.html',
  styleUrl: './measurement-units-asyncawait.css'
})
export class MeasurementUnitsAsyncawait implements OnInit{
  measurementUnits!: MeasurementUnit[];

  constructor(private measurementUnitService: MeasurementUnitService, private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    this.measurementUnits =  await this.measurementUnitService.loadMeasurementUnits();
    this.cdr.detectChanges(); // <<< important for zoneless
  }
}
