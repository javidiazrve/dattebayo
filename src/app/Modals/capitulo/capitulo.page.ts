import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavParams, Platform, ModalController } from '@ionic/angular';
import { Episodio, Anime } from '../../../interfaces';
import { AnimesService } from '../../Services/animes.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SinopsisPage } from '../sinopsis/sinopsis.page';

@Component({
  selector: 'app-capitulo',
  templateUrl: './capitulo.page.html',
  styleUrls: ['./capitulo.page.scss'],
})
export class CapituloPage implements OnInit {
  temporada: number;
  episodio: Episodio;
  anime: Anime;
  siguienteEp: Episodio;
  anteriorEp: Episodio;
  pantallaBloqueada: boolean;

  constructor(
    private navParams: NavParams, 
    private sanitizer: DomSanitizer, 
    private animesService: AnimesService,
    private screenOrientation: ScreenOrientation,
    public platform: Platform,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.setVariables();
    this.setListeners();
  }

  //CONFIGURACION

  setListeners(){
    document.addEventListener("fullscreenchange",(e) => this.bloquearPantalla(), false);
    document.addEventListener("webkitfullscreenchange",(e) => this.bloquearPantalla(), false);
    document.addEventListener("mozfullscreenchange",(e) => this.bloquearPantalla(), false);
  }

  bloquearPantalla(){
    if(this.pantallaBloqueada) this.screenOrientation.unlock();
    else this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);  
      
    this.pantallaBloqueada = !this.pantallaBloqueada;
  }

  setVariables(episodio?: Episodio){
    if(!episodio){
      this.anime = this.navParams.get('anime');
      this.episodio = this.navParams.get('episodio');
    }else{
      this.episodio = episodio;
    }

    this.temporada = Number(this.episodio.temporada);
    this.siguienteEp = this.anime.temporadas[this.temporada - 1].episodios[Number(this.episodio.numero)];
    this.anteriorEp = this.anime.temporadas[this.temporada - 1].episodios[Number(this.episodio.numero) - 2];
    this.pantallaBloqueada = true;
  }

  cerrar(){

    this.modalCtrl.dismiss();

  }

  //FILTROS

  videoUrl(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.episodio.url);
  }

  //ACCIONES

  verSiguiente(){
    this.setVariables(this.siguienteEp);
  }

  verAnterior(){
    this.setVariables(this.anteriorEp);
  }

  async verSinopsis(){

    const modal = await this.modalCtrl.create({
      component: SinopsisPage,
      componentProps: {
        sinopsis: this.episodio.sinopsis,
        foto: this.episodio.poster
      },
      cssClass: "modalSinopsis",
      mode: "ios",
      swipeToClose: true
    })

    modal.present();

  }

  tipoEpisodio(){
    
    switch (this.episodio.tipo) {
      case 0:
        return "Canon";   
      case 1:
        return "Semi-Canon"
      case 2:
        return "Relleno";
    }
  }

  colorIcon(){
    switch (this.episodio.tipo) {
      case 0:
        return "#E1D700"; // color oro   
      case 1:
        return "#c0c0c0" // color plata
      case 2:
        return "#cd7f32"; // color bronze
    }   
  }
}
