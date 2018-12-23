import { Injectable } from '@angular/core';
import {User} from './user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from './todo';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor( private http: HttpClient) { }

  addUser(user: User): Observable<string> {
    return this.http.post<string>('http://localhost:1337/signup', user);
  }
  loginUser(user: User): Observable<string> {
    return this.http.post<string>('http://localhost:1337/login', user);
  }

}
