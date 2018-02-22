import { Message } from './../../model/message';
import { AuthServiceService } from './../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { MessageManageService } from '../../services/message-manage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  emailName: string;
  logging: boolean ;
  message: Message = {
    index: '0' ,
    userEmail : this.emailName ,
    content: '',
    time: Date()
  };
  messages = [] ;
  constructor(private auth0: AuthServiceService, private messageService: MessageManageService , private auth: AuthServiceService) {
  }

  ngOnInit() {
    this.emailName = this.auth0.userObject.userEmail;
    this.logging = this.auth0.logging;
    this.change();
  }
  change() {

    this.messageService.getMessages().subscribe((item) => {
      this.messages = item;
    });
    this.auth0.cartData.subscribe((data) => {
      this.emailName = data;
    });

  }
addMessage(content: HTMLTextAreaElement) {
  this.message.content = content.value ;
  this.message.userEmail = this.emailName ;
  if (content.value !== '') {
    this.messageService.addMessage(this.message);
    content.value = '';
  } else {
    alert('You need enter message') ;
  }
}
deleteMesage(mesage) {
this.messageService.deleteItem(mesage) ;
}
}
