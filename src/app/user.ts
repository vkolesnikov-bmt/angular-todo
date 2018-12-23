import {Todo} from './todo';

export class User {
  username: string;
  password: string;
  todos: Todo[];

  constructor (username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
