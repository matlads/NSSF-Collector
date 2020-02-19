import { Component } from '@angular/core';
import { EmployersService } from '../services/employers.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  searchTerm: string = '';
  data: any = [];
  
  constructor(private employersService: EmployersService) {
  }

  setFilteredItems(){
    if (this.searchTerm.length >= 3) {
      this.data = this.employersService.filterItems(this.searchTerm);
    }
  }

}
