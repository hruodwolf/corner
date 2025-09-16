import {Component, OnInit, Signal} from '@angular/core';
import { RecordCategoryService} from '../../services/record-category.service';
import {RecordCategory} from '../../../../core/models/record-category.model';

@Component({
  selector: 'app-record-categories',
  imports: [],
  templateUrl: './record-categories.html',
  styleUrl: './record-categories.css'
})
export class RecordCategories implements OnInit{
  categories!: Signal<RecordCategory[]>;
  loading!: Signal<boolean>;
  error!: Signal<string | null>;

  constructor(private recordCategoryService: RecordCategoryService) { }

  ngOnInit(): void {
    this.categories = this.recordCategoryService.categories;
    this.loading = this.recordCategoryService.loading;
    this.error = this.recordCategoryService.error;

    this.recordCategoryService.loadAll();
  }
}
