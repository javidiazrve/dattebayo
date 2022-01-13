import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajeErrorComponent } from './mensaje-error/mensaje-error.component';
import { MensajeVacioComponent } from './mensaje-vacio/mensaje-vacio.component';
import { ListaCargandoComponent } from './lista-cargando/lista-cargando.component';
import { ListaAnimesComponent } from './lista-animes/lista-animes.component';

@NgModule({
  declarations: [
      MensajeErrorComponent,
      MensajeVacioComponent,
      ListaCargandoComponent,
      ListaAnimesComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MensajeErrorComponent,
    MensajeVacioComponent,
    ListaCargandoComponent,
    ListaAnimesComponent,
  ],
  providers: [

  ]
})
export class ComponentsModule { }