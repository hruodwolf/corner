import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RecordCategory} from '../../../core/models/record-category.model';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class RecordCategoryService {
  private apiUrl = 'http://localhost:8080/api/record-categories';

  // Signals
  categories = signal<RecordCategory[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  // for signal architecture
  loadAll() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<RecordCategory[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.categories.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Fehler beim Laden der Daten');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  getAll(): Observable<RecordCategory[]> {
    return this.http.get<RecordCategory[]>(this.apiUrl);
  }

}
