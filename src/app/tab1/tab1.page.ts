import { Component } from '@angular/core';
import { EmployersService } from '../services/employers.service';
import { Storage } from '@ionic/storage';
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  data: any = [];
  username: string;
  password: string;
  searching: any = false;
  public searchControl: FormControl;

  constructor(private employersService: EmployersService, private storage: Storage) {
    this.searchControl = new FormControl();
    this.getUsername();
    this.getPassword();
  }

  ngOnInit() {
    this.setFilteredItems("");

    this.searchControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(search => {
        this.searching = false;
        this.setFilteredItems(search);
      });
  }

  setFilteredItems(searchTerm){
    if (searchTerm) {
      if (this.username) {
        this.data = this.employersService.filterItems(searchTerm);
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

  onSearchInput(){
    this.searching = true;
  }
}
