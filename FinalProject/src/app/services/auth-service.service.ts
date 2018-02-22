import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { EventEmitter } from '@angular/core';
import { User } from '../model/user';

@Injectable()
export class AuthServiceService implements OnInit {

  user: Observable<firebase.User>;
  cartData = new EventEmitter<any>();
  userObject = new User() ;
  logging: boolean ;
  constructor(private firebaseAuth: AngularFireAuth) {
  }
  ngOnInit() {
    this.user = this.firebaseAuth.authState;
    this.logging = false;
  }
  signUp(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        this.userObject.userEmail = email;
        this.logIn(email , password);
      })
      .catch(err => {
        alert(err.message);
      });
  }
  logIn(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.logging = true;
        this.userObject.userEmail = email ;
        this.userObject.userPassword = password ;
        this.cartData.emit(this.logging);
        this.cartData.emit(this.userObject.userEmail );
      })
      .catch(err => {
        alert(err);
        this.logging = false;
      });

  }
  logOut() {
    this.firebaseAuth
      .auth
      .signOut();
      this.logging = false ;

  }
}
