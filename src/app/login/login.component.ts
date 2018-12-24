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
        if (this.userResponse !== undefined) {
          localStorage.setItem('currentUserId', JSON.stringify(this.userResponse.id));
          this.router.navigate(['/list']);
        }
      });
    this.showTS = true;
  }

}
