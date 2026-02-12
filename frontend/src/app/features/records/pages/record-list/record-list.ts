import {Component, inject, OnInit} from '@angular/core';
import {RecordListViewModel} from './record-list.viewmodel';
import {AsyncPipe} from '@angular/common';


@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.html',
  imports: [
    AsyncPipe
  ],
  providers: [RecordListViewModel],
  styleUrl: './record-list.css'
})
export class RecordList implements OnInit{
  vm = inject(RecordListViewModel);

  ngOnInit(): void {
    this.vm.load();
  }
}
