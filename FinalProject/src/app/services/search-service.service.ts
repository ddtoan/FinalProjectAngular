import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

@Injectable()
export class SearchServiceService {
  keySearch: string;
  emitter: EventEmitter<any>;
  testarrr = [
    { title: 'sa', id: '0' }];
  constructor(private http: HttpClient) { }
  arr;
  getBooks(): Observable<any> {
    // this.emitter.emit(this.testarrr);
    return this.http.get('https://www.googleapis.com/books/v1/volumes?q=' + this.keySearch);
  }
  getKeySearch(key) {
    this.keySearch = key ;
  }
}
