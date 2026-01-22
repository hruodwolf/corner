import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MeasurementUnit} from '../../../../../../core/models/measurement-unit.model';
import {RecordCategory} from '../../../../../../core/models/record-category.model';
import {RecordService} from '../../../../services/record.service';
import {MeasurementUnitService} from '../../../../../measurement-units/services/measurement-unit.service';
import {RecordCategoryService} from '../../../../../record-categories/services/record-category.service';
import {Router} from '@angular/router';
import {Record} from '../../../../../../core/models/record.model';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-record-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInput,
    MatButton,
  ],
  providers: [
    provideNativeDateAdapter(),
  ],
  templateUrl: './record-form.component.html',
  styleUrl: './record-form.component.css'
})
export class RecordFormComponent implements OnInit {
  form!: FormGroup;

  units: MeasurementUnit[] = []; //??
  categories: RecordCategory[] = [];

  constructor(
    private fb: FormBuilder,
    private recordService: RecordService,
    private categoryService: RecordCategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      recordDate: [new Date(), Validators.required],
      recordValue: [null, [Validators.required, Validators.min(0)]],
      description: [''],
      recordCategory: [null, Validators.required],
    });

    this.categoryService.getAll().subscribe(cats => this.categories = cats);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const record: Record = {
      ...this.form.value,
      recordDate: this.form.value.recordDate.toISOString(), // ISO Format fürs Backend
    };
    console.log(JSON.stringify(record));
    this.recordService.create(record).subscribe({
      next: () => {
        console.log('Saved record');
        this.router.navigate(['/records']).then(success => {
          if (success) {
            console.log('Navigation success');
          } else {
            console.warn('Navigation failure');
          }
        });
      },
      error: err => {
        console.error('Error on save', err);
      }
    });
  }

  onCancel() {
    void this.router.navigate(['/records']);
  }

}
