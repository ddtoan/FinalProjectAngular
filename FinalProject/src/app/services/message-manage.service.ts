import { Message } from './../model/message';
import { Injectable, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { OnInit } from '@angular/core';
@Injectable()
export class MessageManageService implements OnInit {
  messageCollection: AngularFirestoreCollection<Message>;
  messageDoc: AngularFirestoreDocument<Message> ;
  messages: Observable<Message[]> ;
  constructor(private asf: AngularFirestore) {
    this.createFS(); }

  ngOnInit() {
  }

  createFS() {
    console.log('create FS');
    this.messageCollection = this.asf.collection('message');
    this.messages = this.asf.collection('message', ref => ref.orderBy('time')).snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Message;
          data.index = a.payload.doc.id ;
          return data;
        });
    });
  }
  getMessages() {
  this.messages = this.asf.collection('message', ref => ref.orderBy('time')).snapshotChanges()
    .map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Message;
        data.index = a.payload.doc.id;
        return data;
      });
    });
    return this.messages;
  }

  addMessage(message: Message) {
    this.messageCollection.add(message);
  }

  deleteItem(mesage: Message) {
    this.messageDoc = this.asf.doc(`message/${mesage.index}`);
    console.log('delete');
    this.messageDoc.delete();
    console.log(this.messageDoc);
  }
}
