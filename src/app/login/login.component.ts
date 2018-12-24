import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';


import {User} from '../user';
import {SignupService} from '../signup.service';
import {Router} from '@angular/router';


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

  successLogin = false;
  showTS = false;

  constructor(private signupService: SignupService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    const user = new User(this.loginForm.value.username, this.loginForm.value.password);
    this.signupService.loginUser(user)
      .subscribe(data => {
        this.userResponse = data['user'];
        this.messageResponse = data['message'];
        this.successLogin = data['successLogin'];
        if (this.successLogin !== false) {
          localStorage.setItem('currentUserId', JSON.stringify(this.userResponse.id));
          this.router.navigate(['/list']);
        }
      });
    this.showTS = true;

  }

}
