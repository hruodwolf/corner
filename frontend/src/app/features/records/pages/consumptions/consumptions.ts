import {Component, inject} from '@angular/core';
import {ConsumptionViewModel} from './consumption-view-model';

@Component({
  selector: 'app-consumptions',
  imports: [],
  templateUrl: './consumptions.html',
  styleUrl: './consumptions.css',
  providers: [ConsumptionViewModel] //Important!
})
export class Consumptions {
  vm = inject(ConsumptionViewModel);
}
