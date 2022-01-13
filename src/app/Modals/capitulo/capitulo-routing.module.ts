import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapituloPage } from './capitulo.page';

const routes: Routes = [
  {
    path: '',
    component: CapituloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapituloPageRoutingModule {}
