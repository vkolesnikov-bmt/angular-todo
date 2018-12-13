import {Injectable} from '@angular/core';

import {Todo} from './todo';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  todoArr: Todo[] = JSON.parse(localStorage.getItem('todoList')) || [];
  subArr: Todo[] = [];
  todo: Todo;
  subjectArr = new Subject<Todo[]>();
  subjectPagination = new Subject<number[]>();
  pagination: number[] = [1];
  private currentList = 1;
  private currentPage = 1;

  private genID: number;

  constructor() {
  }

  addTodo(task: string): void {
    this.genID = Number(new Date().getTime().toString(10));
    this.todo = {id: this.genID, task: task, status: false};
    this.todoArr.push(this.todo);
    this.showList();
  }

  deleteAll(): void {
    this.todoArr = [];
    this.showList();
  }

  changeStatus(): void {
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
    this.showList();
  }

  deleteCompleted(): void {
    this.todoArr = this.todoArr.filter(item => item.status === false);
    this.showList();
  }

  deleteSingle(idTodo: number): void {
    idTodo = this.todoArr.findIndex(todo => todo.id === idTodo);
    this.todoArr.splice(idTodo, 1);
    this.showList();
  }

  changeStatusTodo(todoEmit: Todo): void {
    let indexTodo: number;
    indexTodo = this.todoArr.findIndex(todo => todo.id === todoEmit.id);
    this.todoArr[indexTodo] = todoEmit;
    this.showList();
  }

  setList(indexList: number): void {
    this.currentList = indexList;
    this.showList();
  }

  setPage(indexPage: number): void {
    this.currentPage = indexPage;
    this.showList();
  }

  showList(): void {
    switch (this.currentList) {
      case 1: {
        this.sendTodosList(this.todoArr);
        break;
      }
      case 2: {
        this.sendTodosList(this.todoArr.filter(item => item.status === false));
        break;
      }
      case 3: {
        this.sendTodosList(this.todoArr.filter(item => item.status === true));
      }
    }
    this.updateStorage();
  }

  private updateStorage(): void {
    localStorage.setItem('todoList', JSON.stringify(this.todoArr));
  }

  private sendTodosList(arr: Todo[]): void {
    this.pagination.length = (Math.ceil(arr.length / 5));
    this.subArr = this.filterSub(arr);
    if (this.subArr.length === 0) {
      this.currentPage = this.pagination.length;
      this.subArr = this.filterSub(arr);
    }
    if (this.pagination.length > 0) {
      for (let i = 0; i < this.pagination.length; i++) {
        this.pagination[i] = i + 1;
      }
    }
    this.subjectPagination.next(this.pagination);
    this.subjectArr.next(this.subArr);
  }

  private filterSub(arr: Todo[]): Todo[] {
    return arr.filter(
      (todo, i) => {
        if (i >= (this.currentPage - 1) * 5 && i <= (this.currentPage - 1) * 5 + 4) {
          return todo;
        }
      }
    );
  }

}

