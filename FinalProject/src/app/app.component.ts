import { Component } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  arraySearched: string[] ;

  logging: boolean ;
  constructor(private auth0: AuthServiceService) {
  }
  ngOnInit() {
    this.logging = this.auth0.logging ;

  this.auth0.cartData.subscribe((data) => {
    this.logging = data ;
  });
}
}
