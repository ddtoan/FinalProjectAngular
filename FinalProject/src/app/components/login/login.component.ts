import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email;
  password;
  constructor(public auth0: AuthServiceService) {
  }

  ngOnInit() {
  }
  signUp() {
    this.auth0.signUp(this.email, this.password);
    this.email = this.password = '';
  }
  login() {
    this.auth0.logIn(this.email, this.password);
    this.email = this.password = '';
  }
  logOut() {
    this.auth0.logOut();
  }
}
