import {Component, computed, effect, OnInit, signal, Signal} from '@angular/core';
import {RecordService} from '../../services/record.service';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow,
  MatRowDef,
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
    MatHeaderCellDef,
    MatCellDef,
    MatRowDef,
    MatRow,
    MatHeaderRow,
    MatButton,
    MatHeaderRowDef,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './records.html',
  styleUrl: './records.css'
})
export class Records implements OnInit  {
  loading!: Signal<boolean>;
  error!: Signal<string|null>;

  readonly categories = signal<RecordCategory[]>([]);
  readonly selectedCategoryId = signal<number | null>(null);



  displayedColumns: string[] = ['recordCategoryName', 'recordDate', 'recordValue', 'unitName'];

  // Gefilterte Records
  readonly filteredRecords = computed(() => {
    console.log('filterRec');
    const selected = this.selectedCategoryId();
    const records = this.recordService.records();
    console.log(this.years());
    return selected ? records.filter(r => r.recordCategoryId === selected) : records;
  });

  // wird nur dann ausgeführt wenn oben console.log (this.year)
  readonly years = computed(() => {
    console.log('in years computed');
    const years = [...new Set(this.recordService.records().map(r => r.recordDate.substring(0, 4)))];
    console.log('Years computed:', years);
    return years;
  });

  constructor(private recordService: RecordService, private categoryService: RecordCategoryService, private router: Router) { }

  ngOnInit() {
    this.loading = this.recordService.loading;
    this.error = this.recordService.error;
    this.recordService.loadAll();
    this.categoryService.getAll().subscribe(data => this.categories.set(data));
  }

  onCreate() {
    this.router.navigate(['/records/add']);
  }

}
