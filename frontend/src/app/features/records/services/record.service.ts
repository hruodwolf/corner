import {Injectable, signal} from '@angular/core';
import {Record} from '../../../core/models/record.model';
import {HttpClient} from '@angular/common/http';
import {delay, lastValueFrom, map, Observable} from 'rxjs';
import {Records} from '../pages/records/records';
import {MeasurementUnit} from '../../../core/models/measurement-unit.model';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private apiUrl = 'http://localhost:8080/api/records';

  //Signals
  records = signal<Record[]>([]);
  loading = signal<boolean>(true);
  error = signal<string|null>(null);

  constructor(private http: HttpClient) { }

  loadAll() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Record[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.records.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Fehler beim Laden der Daten')
        this.loading.set(false);
        console.log(err);
      }
    });
  }

  getRecords(): Observable<Record[]> {
    return this.http.get<Record[]>(this.apiUrl);
  }
  getAllHeatingRecords(): Observable<Record[]> {
    return this.http.get<Record[]>(this.apiUrl).pipe(map((records: Record[]) => records.filter(r => r.recordCategory.id === 1)));
  }

  loadRecordsWithLastValueFrom(): Promise<Record[]> {
    return lastValueFrom(this.getAllHeatingRecords().pipe(delay(1000)));
  }

  create(dto: Partial<Record>): Observable<Record> {
    return this.http.post<Record>(this.apiUrl, dto);
  }
}
