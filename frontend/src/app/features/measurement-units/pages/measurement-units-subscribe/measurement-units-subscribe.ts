import {Component, OnInit} from '@angular/core';
import {MeasurementUnitService} from '../../services/measurement-unit.service';
import {MeasurementUnit} from '../../../../core/models/measurement-unit.model';
import {NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-measurement-units-subscribe',
  imports: [
    NgIf,
    NgFor
  ],
  templateUrl: './measurement-units-subscribe.html',
  styleUrl: './measurement-units-subscribe.css'
})
export class MeasurementUnitsSubscribe implements OnInit{

  measurementUnits!: MeasurementUnit[];

  constructor(private measurementUnitService: MeasurementUnitService) { }

  ngOnInit(){
    this.measurementUnitService.getAll().subscribe({
      next: (data) => {
        console.log('next');
        this.measurementUnits = data;
      },
      complete: () =>{
        console.log('complete');
      },
      error: (err) => {
        console.log('error' + err);
      }
    })
  }
}
