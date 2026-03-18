import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MeasurementUnit} from '../../../core/models/measurement-unit.model';
import {delay, lastValueFrom, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MeasurementUnitService {
  private apiUrl = 'http://localhost:8080/api/measurement-units';

  measurementUnits = signal<MeasurementUnit[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) { }

  getAll(): Observable<MeasurementUnit[]> {
    return this.http.get<MeasurementUnit[]>(this.apiUrl);
  }

  // for signal architecture
  loadAll() {
    this.loading.set(true);
    this.error.set(null);

    this.getAll().subscribe({
      next: (data) => {
        this.measurementUnits.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error on data load');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  loadMeasurementUnits(): Promise<MeasurementUnit[]> {
    return new Promise((resolve, reject) => {
      this.getAll().subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          console.error('error', err);
          reject(err);
        }
      })
    });
  }

  loadMeasurementUnitsWithLastValueFrom(): Promise<MeasurementUnit[]> {
    return lastValueFrom(this.getAll().pipe(delay(1000)));
  }
}
