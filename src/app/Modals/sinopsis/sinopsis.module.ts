import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinopsisPageRoutingModule } from './sinopsis-routing.module';

import { SinopsisPage } from './sinopsis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SinopsisPageRoutingModule
  ],
  declarations: [SinopsisPage]
})
export class SinopsisPageModule {}
