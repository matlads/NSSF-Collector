import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  settings : FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private storage: Storage,
    public alertController: AlertController  
  ) {

      this.settings = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['',   Validators.required],
      });

  }
  saveSettings(){
    this.storage.set('username', this.settings.value.username);
    this.storage.set('password', this.settings.value.password);

    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Saving',
      message: 'Settings Saved successfully',
      buttons: ['OK']
    });

    await alert.present();
  }

}
