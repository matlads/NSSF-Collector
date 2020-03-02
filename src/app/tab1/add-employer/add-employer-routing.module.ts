import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEmployerPage } from './add-employer.page';

const routes: Routes = [
  {
    path: '',
    component: AddEmployerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEmployerPageRoutingModule {}
