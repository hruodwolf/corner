import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, first, map, Observable, take} from 'rxjs';
import {Record} from '../../../../core/models/record.model'
import {RecordService} from '../../services/record.service';

@Injectable()
export class RecordListViewModel {

  private recordsService = inject(RecordService);

  private readonly recordsSubject = new BehaviorSubject<Record[]>([]);
  readonly records$ = this.recordsSubject.asObservable();

  readonly items$ = this.records$.pipe(
    map((records: Record[]) =>
      records.map(r => ({
        id: r.id,
        date: new Date(r.recordDate).toLocaleDateString(),
        value: '0' + r.recordValue
      })).slice(0,10))
  );

  readonly isLoading$ = new BehaviorSubject<boolean>(false);

  vm$ = combineLatest([
    this.items$,
    this.isLoading$
  ]).pipe(
    map(([items, isLoading]) => ({
      items,
      isLoading
    }))
  );

  load(): void {
    this.isLoading$.next(true);
    this.recordsService.getRecords().subscribe({
      next: records => {
        this.recordsSubject.next(records);
        this.isLoading$.next(false);
      },
      error: () => {
        this.isLoading$.next(false);
      }
    });
  }

  refresh(): void {
    this.load();
  }
}
