import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MeasurementUnit} from '../../../../../../core/models/measurement-unit.model';
import {RecordCategory} from '../../../../../../core/models/record-category.model';
import {RecordService} from '../../../../services/record.service';
import {MeasurementUnitService} from '../../../../../measurement-units/services/measurement-unit.service';
import {RecordCategoryService} from '../../../../../record-categories/services/record-category.service';
import {Router} from '@angular/router';
import {RecordDto} from '../../../../../../core/models/record.dto';
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

  units: MeasurementUnit[] = [];
  categories: RecordCategory[] = [];

  constructor(
    private fb: FormBuilder,
    private recordService: RecordService,
    private unitService: MeasurementUnitService,
    private categoryService: RecordCategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      recordDate: [new Date(), Validators.required],
      recordValue: [null, [Validators.required, Validators.min(0)]],
      description: [''],
      unitId: [null, Validators.required],
      recordCategoryId: [null, Validators.required],
    });

    this.unitService.getAll().subscribe(units => this.units = units);
    this.categoryService.getAll().subscribe(cats => this.categories = cats);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const dto: RecordDto = {
      ...this.form.value,
      recordDate: this.form.value.recordDate.toISOString(), // ISO Format fürs Backend
    };

    this.recordService.create(dto).subscribe({
      next: () => {
        console.log('Record gespeichert');
        this.router.navigate(['/records']).then(success => {
          if (success) {
            console.log('Navigation erfolgreich');
          } else {
            console.warn('Navigation fehlgeschlagen');
          }
        });
      },
      error: err => {
        console.error('Fehler beim Speichern', err);
      }
    });
  }
}
