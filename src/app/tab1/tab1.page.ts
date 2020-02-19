import { Component } from '@angular/core';
import { EmployersService } from '../services/employers.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  searchTerm: string = '';
  data: any = [];
  username: string;
  password: string;

  constructor(private employersService: EmployersService, private storage: Storage) {
    this.getUsername();
    this.getPassword();
  }

  setFilteredItems(){
    if ( this.username ) {
      if (this.searchTerm.length >= 3) {
        this.data = this.employersService.filterItems(this.searchTerm);
      }
    }
  }

  getUsername() {
		this.storage.get('username').then(val => {
      this.username = val
    });
  }

  getPassword() {
    this.storage.get('password').then(val => {
      this.password = val
    });
  }
}
