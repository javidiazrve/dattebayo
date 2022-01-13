import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, NavParams } from '@ionic/angular';

import { AnimePageRoutingModule } from './anime-routing.module';

import { AnimePage } from './anime.page';
import { ComponentsModule } from '../../Components/components.module';
import { IonCollapseHeaderModule } from 'ion-collapse-header';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimePageRoutingModule,
    ComponentsModule,
    IonCollapseHeaderModule
  ],
  providers: [
    NavParams
  ],
  declarations: [AnimePage]
})
export class AnimePageModule {}
