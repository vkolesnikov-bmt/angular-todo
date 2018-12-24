import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '../user';
import {SignupService} from '../signup.service';
import {Todo} from '../todo';
import {TodoDataService} from '../todo-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userResponse: User;
  messageResponse: string;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  showTS = false;
  testArr$: Observable<Todo[]>;

  constructor(private signupService: SignupService, private dataService: TodoDataService) {
    this.testArr$ = this.dataService.subjectArr$;
  }

  ngOnInit() {
  }

  login() {
    const user = new User(this.loginForm.value.username, this.loginForm.value.password);
    this.signupService.loginUser(user)
      .subscribe(data => {
        this.userResponse = data['user'];
        this.messageResponse = data['message'];
      });
    if (this.userResponse !== undefined) {
      localStorage.setItem('currentUserId', JSON.stringify(this.userResponse.id));
      // localStorage.setItem('currentUsername', JSON.stringify(this.userResponse.username));
    }
    this.showTS = true;
  }

  logout() {
    localStorage.removeItem('currentUserId');
  }
}
