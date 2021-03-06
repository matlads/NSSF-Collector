import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EmployersService } from "src/app/services/employers.service";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Storage } from '@ionic/storage';
import { environment } from "../../../environments/environment";
import { AlertController, NavController } from "@ionic/angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

const watchOptions = {
  timeout: 360000,
  enableHighAccuracy: true,
  maximumAge: 30000
};

const headerDict = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Headers": "Content-Type"
};

const requestOptions = {
  headers: new HttpHeaders(headerDict)
};

@Component({
  selector: "app-view-employer",
  templateUrl: "./view-employer.page.html",
  styleUrls: ["./view-employer.page.scss"]
})
export class ViewEmployerPage implements OnInit {
  id: any;
  employer: any;
  watch: any;
  location: any;
  env: any;
  username: string;
  password: string;
  contactData: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private employersService: EmployersService,
    private geolocation: Geolocation,
    private alertController: AlertController,
    public http: HttpClient,
    private storage: Storage,
    private formBuilder: FormBuilder, 
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.employer = this.employersService.get(this.id);
    this.env = environment;

    this.getUsername();
    this.getPassword();

    this.contactData = this.formBuilder.group({
      closed_gate: ['n', Validators.required],
      contact_1_name: [''],
      contact_1_tel: [''],
      contact_2_name: [''],
      contact_2_tel: [''],
      notes: ['']
    })
  }

  ngOnInit() {
    this.startPositionWatch();
  }

  startPositionWatch() {
    console.log("starting positional watch");
    var that = this;
    this.watch = this.geolocation.watchPosition(watchOptions).subscribe(
      data => {
        that.location = data;
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

  save() {
    const url = this.env.apiUrl + "/employers/create";
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
      return this.http.post<any>(url, string).subscribe(
        (response) => {
          this.presentAlert("Employer Saved Successfully");
          // this.navCtrl.navigateBack('/tabs/tab1');
        },
        (error) => {
          this.presentError(error.error.result);
        }
      );
    }
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
