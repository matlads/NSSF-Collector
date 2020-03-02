import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { environment } from "../../../environments/environment";

const watchOptions = {
  timeout: 360000,
  enableHighAccuracy: true,
  maximumAge: 30000
};


@Component({
  selector: 'app-add-employer',
  templateUrl: './add-employer.page.html',
  styleUrls: ['./add-employer.page.scss'],
})
export class AddEmployerPage implements OnInit {
  employer: any;
  watch: any;
  location: any;
  env: any;
  username: string;
  password: string;
  contactData: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private geolocation: Geolocation
  ) { 
    this.env = environment;
    this.contactData = this.formBuilder.group({
      employer_name: ['', Validators.required],
      closed_gate: ['n', Validators.required],
      contact_1_name: [''],
      contact_1_tel: [''],
      contact_2_name: [''],
      contact_2_tel: [''],
      notes: ['']
    })
    this.startPositionWatch();
  }

  ngOnInit() {
  }

  startPositionWatch()
  {
    console.log("starting positional watch");
    var that = this;
    this.watch = this.geolocation.watchPosition(watchOptions).subscribe(
      data => {
        that.location = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
