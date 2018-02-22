import { SearchServiceService } from './../../services/search-service.service';
import { Item } from './../../model/item';
import { Component, OnInit } from '@angular/core';
import { ItemManageService } from '../../services/item-manage.service';

import { CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent } from 'ng-auto-complete';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  itemss: Item[];
  arr = [];
  lastItem: Item;
  items2 = [];
  title2 = [];
  config2: any = { 'sourceField': ['payload', 'label'] };
  configTitle = { 'sourceField': ['payload', 'label'] };
  item: Item = {
    index: '0',
    id: 1,
    nameBook: '',
    title: '',
    user: ''
  };
  public group;
  constructor(private itemService: ItemManageService, private searchService: SearchServiceService, private auth0: AuthServiceService) {
  }
  ngOnInit() {
    this.itemService.getItems().subscribe((item) => {
      this.itemss = item;
      if (this.itemss !== undefined) {
        this.lastItem = item.slice(-1).pop();
      } else {
        this.lastItem.id = 1;
      }
    });

  }
  onSearch() {
    this.items2 = new Array;
    this.searchService.getBooks()
      .subscribe(
        (data) => {
          this.arr = data.items;
          if (this.arr === undefined) {
            this.arr = [];
            this.arr.push('No data result');
            this.arr.push('No data result');
            console.log(this.arr);
          } else {
            for (let i = 0; i < this.arr.length; i++) {
              this.items2.push(this.arr[i].volumeInfo.title);
              this.title2.push(this.arr[i].volumeInfo.subtitle);
            }
          }
        }
      );
  }
  setKeySearch(value) {
    this.searchService.getKeySearch(value);
    this.onSearch();
  }

  onAddItem(name: string, title: string) {
    if (title === '') {
      title = 'No have description';
    }
    if (name !== '') {
      if (this.lastItem !== undefined) {
        this.item.id = this.lastItem.id + 1;
      } else {
        this.item.id = 1;
      }
      this.item.nameBook = name;
      this.item.title = title;
      this.item.user = this.auth0.userObject.userEmail;
      this.itemService.addItem(this.item);
    } else {
      alert('Please enter BookName ');
    }
  }


}
