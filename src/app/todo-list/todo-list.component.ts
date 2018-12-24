import {Component, OnInit, DoCheck} from '@angular/core';


import {TodoDataService} from '../todo-data.service';
import {Todo} from '../todo';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, DoCheck {

  addForm = new FormGroup({
    task: new FormControl('')
  });

  currentList = 1;
  currentPage = 1;


  todoList$: Observable<Todo[]>;
  pagination$: Observable<number[]>;

  private message: string;
 //  private currentUsername: string;
  constructor(private dataService: TodoDataService) {
    this.todoList$ = this.dataService.subjectArr$;
    this.pagination$ = this.dataService.subjectPagination$;
  }

  ngOnInit() {
    this.dataService.getTodo(this.dataService.currentUserId);
    this.dataService.showList(this.currentList, this.currentPage);
   // this.currentUsername = JSON.parse(localStorage.getItem('currentUsername'));
  }

  ngDoCheck() {
    this.dataService.showList(this.currentList, this.currentPage);
  }

  public createTodo(): void {
    if (!this.addForm.value.task.trim()) {
      return;
    }
    this.dataService.addTodo(this.addForm.value.task).subscribe(data => {
      this.dataService.getTodo(this.dataService.currentUserId);
      this.message = data['message'];
    });
    this.addForm.patchValue({task: ''});
  }


  public editTodo(todo: Todo): void {
    this.dataService.editTodo(todo).subscribe(data => {
      this.dataService.getTodo(this.dataService.currentUserId);
      this.message = data['message'];
    });
  }

  public deleteTodo(id: number): void {
    this.dataService.deleteSingle(id).subscribe(data => {
      this.dataService.getTodo(this.dataService.currentUserId);
      this.message = data['message'];
    });
  }

  public deleteAll(): void {
    this.dataService.deleteAll().subscribe(data => {
      this.dataService.getTodo(this.dataService.currentUserId);
      this.message = data['message'];
    });
  }

  public changeStatus(): void {
    this.dataService.changeStatus().subscribe(data => {
      this.dataService.getTodo(this.dataService.currentUserId);
      this.message = data['message'];
    });
  }

  public deleteCompleted(): void {
    this.dataService.deleteCompleted().subscribe(data => {
      this.dataService.getTodo(this.dataService.currentUserId);
      this.message = data['message'];
    });
  }


  public showList(currentList: number = this.currentList, currentPage: number = this.currentPage) {
    this.currentList = currentList;
    this.currentPage = currentPage;
  }
}
