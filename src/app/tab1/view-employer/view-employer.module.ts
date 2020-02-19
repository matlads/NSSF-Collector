import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewEmployerPageRoutingModule } from './view-employer-routing.module';

import { ViewEmployerPage } from './view-employer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewEmployerPageRoutingModule
  ],
  declarations: [ViewEmployerPage]
})
export class ViewEmployerPageModule {}
