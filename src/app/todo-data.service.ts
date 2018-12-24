import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Todo} from './todo';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  public todoArr: Todo[];

  public subjectArr = new Subject<Todo[]>();
  public subjectArr$ = new Observable<Todo[]>();

  public subjectPagination = new Subject<number[]>();
  public subjectPagination$ = new Observable<number[]>();
  public currentUserId = JSON.parse(localStorage.getItem('currentUserId'));
  private todosOnPage = 10;
  private urlHost = 'http://localhost:1337';

  constructor(private http: HttpClient) {

    this.getTodo(this.currentUserId);
    this.subjectArr$ = this.subjectArr.asObservable();
    this.subjectPagination$ = this.subjectPagination.asObservable();
  }

  public addTodo(task: string): Observable<string> {
    return this.http.post<string>(`${this.urlHost}/addTodo`, {task: task, currentUserId: this.currentUserId});
  }


  public deleteSingle(idTodo: number): Observable<string> {
    return this.http.delete<string>(`${this.urlHost}/User/${this.currentUserId}/todo/${idTodo}`);
  }

  public editTodo(todoEmit: Todo): Observable<string> {
    return this.http.put<string>(`${this.urlHost}/edit`, todoEmit);
  }

  public getTodo(userId: number): void {
    this.http.post<Todo[]>(`${this.urlHost}/list`, {currentUserId: userId})
      .subscribe(data => {
        this.todoArr = data;
        this.subjectArr.next(this.todoArr);
      });
  }

  public changeStatus(): Observable<string> {
    const arrFilter = this.todoArr.filter(item => item.status === true);
    if (arrFilter.length === this.todoArr.length) {
      return this.http.put<string>(`${this.urlHost}/statusAll`, {currentUserId: this.currentUserId, status: false});
    } else {
      return this.http.put<string>(`${this.urlHost}/statusAll`, {currentUserId: this.currentUserId, status: true});
    }
  }

  public deleteCompleted(): Observable<string> {
    return this.http.delete<string>(`${this.urlHost}/User/${this.currentUserId}/completedTodos`);
  }


  public deleteAll(): Observable<string> {
    return this.http.delete<string>(`${this.urlHost}/User/${this.currentUserId}/todos`);
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

