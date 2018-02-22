import { SearchServiceService } from './services/search-service.service';
import { AuthServiceService } from './services/auth-service.service';
import { environment } from './../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {Routes , RouterModule} from '@angular/router' ;

import { AppComponent } from './app.component';
import { ItemManageService } from './services/item-manage.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRouterModule } from './routerModule/route.module';
import { MessageManageService } from './services/message-manage.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
  ],
  providers: [AuthServiceService, ItemManageService , SearchServiceService , MessageManageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
