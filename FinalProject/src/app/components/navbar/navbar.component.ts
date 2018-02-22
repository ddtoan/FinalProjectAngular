import { AuthServiceService } from './../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName: string ;
  constructor(private  auth0: AuthServiceService) {
   }

  ngOnInit() {
    this.userName = this.auth0.userObject.userEmail.substring(0, this.auth0.userObject.userEmail.lastIndexOf('@'));
  }
  logOut() {
    this.auth0.logOut();
    console.log(this.auth0.logging);
  }
}
