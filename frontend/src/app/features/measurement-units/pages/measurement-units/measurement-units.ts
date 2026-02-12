import {Component, inject, OnInit, Signal} from '@angular/core';
import {MeasurementUnit} from '../../../../core/models/measurement-unit.model';
import {MeasurementUnitService} from '../../services/measurement-unit.service';

@Component({
  selector: 'app-measurement-units',
  imports: [],
  templateUrl: './measurement-units.html',
  styleUrl: './measurement-units.css'
})
export class MeasurementUnits implements OnInit{
  measurementUnits!: Signal<MeasurementUnit[]>;
  loading!: Signal<boolean>;
  error!: Signal<string | null>;

  private measurementUnitService = inject(MeasurementUnitService);

  ngOnInit() {
    this.measurementUnits = this.measurementUnitService.measurementUnits;
    this.loading = this.measurementUnitService.loading;
    this.error = this.measurementUnitService.error;

    this.measurementUnitService.loadAll();
  }
}
