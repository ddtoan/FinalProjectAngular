import { Item } from './../../model/item';
import { ItemManageService } from './../../services/item-manage.service';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { map } from 'rxjs/operator/map';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items = [] ;
  selectedItem: Item ;
  bookName: string;
  bookDescription: string ;
  userNameCompact: string ;
  userName: string ;
  constructor(private itemService: ItemManageService , private auth0: AuthServiceService) {
   }

  ngOnInit() {
    this.userName = this.auth0.userObject.userEmail ;
    this.userNameCompact = this.auth0.userObject.userEmail.substring(0, this.auth0.userObject.userEmail.lastIndexOf('@'));
    this.itemService.getItems()
    .subscribe((item) => {
      this.items = item;
    });
  }
  onSelected(item: Item) {
    this.selectedItem = {
      index: item.index ,
      id: item.id,
      nameBook: item.nameBook,
      title: item.title,
      user: item.user
    };
    this.bookName = this.selectedItem.nameBook ;
    this.bookDescription = this.selectedItem.title ;

}
onDelete(item) {
  this.itemService.deleteItem(item) ;
}
onEdit(editBookName: HTMLInputElement, editBookDescription: HTMLInputElement) {
  if (editBookName.value === '' || editBookDescription.value === '') {
    alert('Book name & Description can\' be null . Please try again !!');
  } else {
  this.selectedItem.nameBook = editBookName.value ;
  this.selectedItem.title = editBookDescription.value ;
  this.itemService.editItem(this.selectedItem);
  }
}
}
