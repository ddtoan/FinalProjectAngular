import { Injectable, EventEmitter } from '@angular/core';


import { Item } from './../model/item';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class ItemManageService {
  itemCollection: AngularFirestoreCollection<Item>;
  itemDoc: AngularFirestoreDocument<Item>;
  items: Observable<Item[]>;
  useName: string;
  searchKey: string;
  constructor(private asf: AngularFirestore, private auth0: AuthServiceService) {
    this.createFS();
    this.useName = auth0.userObject.userEmail;
  }
  createFS() {
    this.itemCollection = this.asf.collection('listBook');
    this.items = this.asf.collection('listBook', ref => ref.orderBy('id', 'desc')).snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Item;
          data.index = a.payload.doc.id;
          return data;
        });
      });

  }
  getItems(): Observable<Item[]> {
    this.items = this.asf.collection('listBook', ref => ref.orderBy('id', 'asc')).snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Item;
          data.index = a.payload.doc.id;
          return data;
        });
      });
    return this.items;
  }
  addItem(item: Item) {
    this.itemCollection.add(item);
  }
  editItem(item: Item) {
    this.itemDoc = this.asf.doc(`listBook/${item.index}`);
    this.itemDoc.update(item);
  }
  deleteItem(item: Item) {
    this.itemDoc = this.asf.doc(`listBook/${item.index}`);
    this.itemDoc.delete();
  }

}
