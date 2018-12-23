import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

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

  message: string;

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
  onSubmit() {
    const user = new User(this.loginForm.value.username, this.loginForm.value.password);
    this.signupService.loginUser(user).subscribe(data => this.message = data);
  }

  showT() {
    this.dataService.getTodo();
    console.log(this.testArr$);
    this.showTS = true;
  }

}
