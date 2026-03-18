import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
  styleUrl: './measurement-units-subscribe.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeasurementUnitsSubscribe implements OnInit{

  measurementUnits!: MeasurementUnit[];

  showNumber!: number;

  constructor(private measurementUnitService: MeasurementUnitService,
              private cd: ChangeDetectorRef) { }

  ngOnInit(){
    this.measurementUnitService.getAll().subscribe({
      next: (data) => {
        console.log('next' + JSON.stringify(data));
        this.measurementUnits = data;
        this.cd.markForCheck(); //due to zoneless, update the view
      },
      complete: () =>{
        console.log('complete');
      },
      error: (err) => {
        console.log('error' + err);
      }
    })
  }

  countNumbers(): Promise<number> {
    return new Promise((resolve, reject) => {
      resolve(Math.random());
      //reject(new Error('Error occurred'))
    })
  }

  async pressButton() {
    console.log("Pressed button");
    this.showNumber = await this.countNumbers();
  }
}
