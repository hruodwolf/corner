import {MeasurementUnit} from './measurement-unit.model';

export interface RecordCategory {
  id: number;
  name: string;
  description: string;
  measurementUnit: MeasurementUnit;
}
