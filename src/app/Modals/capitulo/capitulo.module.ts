import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapituloPageRoutingModule } from './capitulo-routing.module';

import { CapituloPage } from './capitulo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CapituloPageRoutingModule
  ],
  declarations: [CapituloPage]
})
export class CapituloPageModule {}
