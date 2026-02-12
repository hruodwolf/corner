import {Component, OnInit} from '@angular/core';
import {MeasurementUnitService} from '../../services/measurement-unit.service';
import {Observable} from 'rxjs';
import {MeasurementUnit} from '../../../../core/models/measurement-unit.model';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-measurement-units-asyncpipe',
  imports: [
    AsyncPipe,
    NgIf,
    NgFor
  ],
  templateUrl: './measurement-units-asyncpipe.html',
  styleUrl: './measurement-units-asyncpipe.css'
})
export class MeasurementUnitsAsyncpipe implements OnInit {

  measurementUnitsObs!: Observable<MeasurementUnit[]>;

  constructor(private measurementUnitService: MeasurementUnitService) {
  }

  ngOnInit(): void {
    this.measurementUnitsObs = this.measurementUnitService.getAll();
  }
}
