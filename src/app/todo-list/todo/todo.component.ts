import {Component, EventEmitter, OnInit, Output, Input, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';

import { Todo } from '../../todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, AfterViewChecked {

  @Input() todo: Todo;
  @Output() changeStatusTodo = new EventEmitter<Todo>();
  @Output() deleteTodo = new EventEmitter<number>();
  @Output() changePagination = new EventEmitter<number>();
  @ViewChild('editInput') editInput: ElementRef;

  private editTest = true;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    if (!this.editTest) {
      this.editInput.nativeElement.focus();
    }
  }

  changeStatusTD(): void {
    this.todo.status = !this.todo.status;
    this.changeStatusTodo.emit(this.todo);
  }
  deleteTD(id: number): void {
    this.deleteTodo.emit(id);
  }
  editTodo(edit: boolean, newTask?: string): void {
    if (edit && newTask !== '') {
      this.todo.task = newTask;
    }
    this.editTest = edit;
    this.changeStatusTodo.emit(this.todo);
  }
}
