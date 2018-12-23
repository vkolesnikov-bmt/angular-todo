import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../user';
import {SignupService} from '../signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  message: string;

  constructor(private signupService: SignupService) { }

  ngOnInit() {
  }

  onSubmit() {
    const user = new User(this.signupForm.value.username, this.signupForm.value.password);
    this.signupService.addUser(user).subscribe(data => this.message = data);
  }
}
