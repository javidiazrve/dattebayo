import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SinopsisPage } from './sinopsis.page';

const routes: Routes = [
  {
    path: '',
    component: SinopsisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SinopsisPageRoutingModule {}
