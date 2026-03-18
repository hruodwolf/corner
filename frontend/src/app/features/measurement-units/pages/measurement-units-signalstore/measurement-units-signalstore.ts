import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MeasurementUnitStore} from './measurement-unit-store';


@Component({
  selector: 'app-measurement-units-signalstore',
  imports: [],
  templateUrl: './measurement-units-signalstore.html',
  styleUrl: './measurement-units-signalstore.css',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeasurementUnitsSignalstore {
  public readonly store = inject(MeasurementUnitStore);
}
