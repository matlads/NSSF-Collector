import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEmployerPageRoutingModule } from './add-employer-routing.module';

import { AddEmployerPage } from './add-employer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEmployerPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddEmployerPage]
})
export class AddEmployerPageModule {}
