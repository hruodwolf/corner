import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MeasurementUnitService} from '../../services/measurement-unit.service';
import {MeasurementUnit} from '../../../../core/models/measurement-unit.model';
import {NgFor, NgIf} from '@angular/common';
import {delay, interval, Subject, takeUntil} from 'rxjs';

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
export class MeasurementUnitsSubscribe implements OnInit, OnDestroy{

  measurementUnits!: MeasurementUnit[];

  private destroyInterval$ = new Subject<void>();

  showNumber!: number;

  countInt: number = 0;

  constructor(private measurementUnitService: MeasurementUnitService,
              private cd: ChangeDetectorRef) { }

  ngOnInit(){
    this.measurementUnitService.getAll().pipe(delay(1000)).subscribe({
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
    });

    interval(2000).pipe(takeUntil(this.destroyInterval$)).subscribe({
      next: (value) => {
        this.countInt = value;
        this.cd.markForCheck();
        console.log(this.countInt);
        },
      });
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

  private cleanUpInterval() {
    this.destroyInterval$.next();
    this.destroyInterval$.complete();
  }

  destroyInterval() {
    this.cleanUpInterval();
  }

  ngOnDestroy(): void {
    this.cleanUpInterval();
  }
}
