import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewEmployerPage } from './view-employer.page';

const routes: Routes = [
  {
    path: '',
    component: ViewEmployerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewEmployerPageRoutingModule {}
