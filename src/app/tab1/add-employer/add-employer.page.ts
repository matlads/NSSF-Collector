import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

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
    private geolocation: Geolocation,
    private http: HttpClient,
    private alertController: AlertController,
    private storage: Storage,
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
    this.getUsername();
    this.getPassword();
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

  cloneAsObject(obj) {
    if (obj === null || !(obj instanceof Object)) {
      return obj;
    }
    var temp = obj instanceof Array ? [] : {};
    // ReSharper disable once MissingHasOwnPropertyInForeach
    for (var key in obj) {
      temp[key] = this.cloneAsObject(obj[key]);
    }
    return temp;
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: "Alert",
      subHeader: "Saving",
      message: message,
      buttons: ["OK"]
    });

    await alert.present();
  }

  async presentError(message) {
    message = message || "Error occurred. Check data, WiFi or Server status";
    const alert = await this.alertController.create({
      header: "Error",
      subHeader: "Saving",
      message: message,
      buttons: ["OK"]
    });

    await alert.present();
  }

  save() {
    const url = this.env.apiUrl + "/employers/new/";
    var obj = {
      data: this.cloneAsObject(this.employer),
      contact_data: this.cloneAsObject(this.contactData.value),
      location: this.cloneAsObject(this.location),
      username: this.username,
      password: this.password
    };

    if (!obj.username) {
      this.presentAlert("No Username found");
    } else {
      var string = JSON.stringify(obj);
      return this.http.post<any>(url, string)
        .subscribe(
          (response) => {
            this.presentAlert("New Employer Saved Successfully");
            // this.navCtrl.navigateBack('/tabs/tab1');
          },
          (error) => {
            this.presentError(error.error.result);
          }
        );  
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
