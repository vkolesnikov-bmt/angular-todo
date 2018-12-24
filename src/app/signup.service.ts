import {Injectable} from '@angular/core';
import {User} from './user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  addUser(user: User): Observable<string> {
    return this.http.post<string>('http://localhost:1337/signup', user);
  }

  loginUser(user: User): Observable<object> {
    return this.http.post<object>('http://localhost:1337/login', user);
  }

  // logoutUser(): Observable<any> {
  //   return this.http.get<any>('http://localhot:1337/logout')
  // }

}
