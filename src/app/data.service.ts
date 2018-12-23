import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Todo} from './todo';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public todoArr: Todo[];

  public subjectArr = new Subject<Todo[]>();
  public subjectArr$ = new Observable<Todo[]>();

  public subjectPagination = new Subject<number[]>();
  public subjectPagination$ = new Observable<number[]>();

  private todosOnPage = 10;

  constructor(private http: HttpClient) {
    // this.getTodoList().subscribe(data => this.subjectArr.next(data));
    // this.todoArr = JSON.parse(localStorage.getItem('todoList')) || [];
    console.log(this.todoArr);
    this.subjectArr$ = this.subjectArr.asObservable();
    this.subjectPagination$ = this.subjectPagination.asObservable();
  }

  public addTodo(task: string): void {
    this.todoArr.push(new Todo(task));
  }

  public deleteAll(): void {
    this.todoArr = [];
  }

  public changeStatus(): void {
    const arrFilter = this.todoArr.filter(item => item.status === true);
    if (arrFilter.length === this.todoArr.length) {
      this.todoArr = this.todoArr.map((item) => {
        item.status = false;
        return item;
      });
    } else {
      this.todoArr = this.todoArr.map((item) => {
        item.status = true;
        return item;
      });
    }
  }

  public deleteCompleted(): void {
    this.todoArr = this.todoArr.filter(item => item.status === false);
  }

  public deleteSingle(idTodo: number): void {
    idTodo = this.todoArr.findIndex(todo => todo.id === idTodo);
    this.todoArr.splice(idTodo, 1);
  }

  public editTodo(todoEmit: Todo): void {
    let indexTodo: number;
    indexTodo = this.todoArr.findIndex(todo => todo.id === todoEmit.id);
    this.todoArr[indexTodo] = todoEmit;
  }



  public showList(currentList: number, currentPage: number): void {
    switch (currentList) {

      case 1: {
        this.sendTodosList(this.todoArr, currentPage);
        break;
      }

      case 2: {
        this.sendTodosList(this.todoArr.filter(item => item.status === false), currentPage);
        break;
      }

      case 3: {
        this.sendTodosList(this.todoArr.filter(item => item.status === true), currentPage);
      }
    }

    // this.updateStorage();
  }

  // private updateStorage(): void {
  //   localStorage.setItem('todoList', JSON.stringify(this.todoArr));
  // }


  private sendTodosList(arr: Todo[], currentPage: number): void {
    const pagination: number[] = new Array(Math.ceil(arr.length / this.todosOnPage));
    let subArr: Todo[];
    subArr = this.filterSub(arr, currentPage);
    if (subArr.length === 0) {
      currentPage = pagination.length;
      subArr = this.filterSub(arr, currentPage);
    }
    this.subjectPagination.next(pagination);
    this.subjectArr.next(subArr);
  }

  private filterSub(arr: Todo[], currentPage: number): Todo[] {
    return arr.filter((todo, i) => {
        if (i >= (currentPage - 1) * this.todosOnPage && i <= (currentPage - 1) * this.todosOnPage + this.todosOnPage - 1) {
          return todo;
        }
      }
    );
  }

}

