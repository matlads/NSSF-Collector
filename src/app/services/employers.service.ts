import { Injectable } from '@angular/core';
import emps from './employers.json';

@Injectable({
  providedIn: 'root'
})
export class EmployersService {

  employers : any = [];

  constructor() {
    this.employers = emps;
   }

  public getEmployers(){
    return this.getEmployers;
  }

  public get(fid: string){
    return this.employers.find(element => element['Employer Number'] === fid );
  }

  public filterItems(searchTerm: string) {
    return this.employers.filter(item => {
      return item["Employer Name"].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

}
