import { AuthServiceService } from './../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  arraySearched: string[];

  logging: boolean;
  constructor(private auth0: AuthServiceService) {
  }
  ngOnInit() {
    this.logging = this.auth0.logging;

    this.auth0.cartData.subscribe((data) => {
      this.logging = data;
    });
  }

}
