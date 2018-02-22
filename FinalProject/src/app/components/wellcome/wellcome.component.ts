import { AuthServiceService } from './../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.component.html',
  styleUrls: ['./wellcome.component.css']
})
export class WellcomeComponent implements OnInit {

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
