import {Component, computed, OnInit, signal, Signal} from '@angular/core';
import {RecordService} from '../../services/record.service';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {RecordCategory} from '../../../../core/models/record-category.model';
import {RecordCategoryService} from '../../../record-categories/services/record-category.service';

@Component({
  selector: 'app-records',
  imports: [
    MatProgressSpinner,
    MatCard,
    MatCardTitle,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    DatePipe,
    MatRow,
    MatHeaderRow,
    MatButton,
    MatFormFieldModule,
    MatSelectModule,
    MatHeaderRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatRowDef,
  ],
  templateUrl: './records.html',
  styleUrl: './records.css'
})
export class Records implements OnInit  {
  loading!: Signal<boolean>;
  error!: Signal<string|null>;

  readonly categories = signal<RecordCategory[]>([]);
  readonly selectedCategoryId = signal<number | null>(null);
  readonly selectedYear = signal<number | null>(null);


  displayedColumns: string[] = ['recordCategoryName', 'recordDate', 'recordValue', 'unitName'];

  readonly filteredRecords = computed(() => {
    console.log('readonly filteredRecords');
    const selectedCat = this.selectedCategoryId();
    const selectedYear = this.selectedYear();
    const records = this.recordService.records();

    let tempRecords = selectedCat ? records
          .filter(r => {
            return r.recordCategory.id === selectedCat;
          }) : records;

    tempRecords = selectedYear ? tempRecords
      .filter(r => new Date(r.recordDate).getFullYear() === selectedYear) : tempRecords;

    return tempRecords;
  });

  readonly years = computed(() => {
    console.log('readonly years');
    return [...new Set(
      this.recordService.records()
        .map(r => new Date(r.recordDate).getFullYear())
        .filter(y => !isNaN(y))
    )].sort((a, b) => b - a);
  });

  constructor(private recordService: RecordService, private categoryService: RecordCategoryService, private router: Router) {
    console.log('constructor');
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.loading = this.recordService.loading;
    this.error = this.recordService.error;
    this.recordService.loadAll();
    this.categoryService.getAll().subscribe(data => this.categories.set(data));
  }

  onCreate() {
    void this.router.navigate(['/records/add']);
  }

}
