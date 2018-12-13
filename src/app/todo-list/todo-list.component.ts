import {Component, OnInit, DoCheck} from '@angular/core';


import {TodoDataService} from '../todo-data.service';
import {Todo} from '../todo';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, DoCheck {

  todoList: Todo[];
  pagination: number[] = [];
  addForm = this.formBuilder.group({
    task: ['']
  });

  constructor(private dataService: TodoDataService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.dataService.subjectPagination.subscribe(
      data => this.pagination = data
    );
    this.dataService.subjectArr.subscribe(
      data => this.todoList = data
    );
    this.dataService.showList();
  }

  ngDoCheck() {
  }

  onSubmit(): void {
    if (!this.addForm.value.task.trim()) {
      return;
    }
    this.dataService.addTodo(this.addForm.value.task);
    this.addForm.patchValue({task: ''});
  }


  deleteAll(): void {
    this.dataService.deleteAll();
  }

  changeStatus(): void {
    this.dataService.changeStatus();
  }

  deleteCompleted(): void {
    this.dataService.deleteCompleted();
  }

  deleteTodo(id: number): void {
    this.dataService.deleteSingle(id);
  }

  changeStatusTodo(todo: Todo): void {
    this.dataService.changeStatusTodo(todo);
  }

  setList(indexList: number): void {
    this.dataService.setList(indexList);
  }

  setPage(indexPage: number): void {
    this.dataService.setPage(indexPage);
  }
}
