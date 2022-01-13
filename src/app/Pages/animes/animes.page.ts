import { Component, OnInit } from '@angular/core';
import { AnimesService } from 'src/app/Services/animes.service';
import { Anime } from 'src/interfaces';
import { NavController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-animes',
  templateUrl: './animes.page.html',
  styleUrls: ['./animes.page.scss'],
})
export class AnimesPage implements OnInit {

  constructor(
    private animesService:AnimesService,
    private navCtrl: NavController,
    private platforms: Platform
  ) { }

  animes: Anime[];
  animesCopia: Anime [];
  cargando: Boolean = true;
  errorHttp: Boolean = false;
  platform: String;

  ngOnInit() {
    this.getAnimes();
    this.checkPlatform();
  } 

  //CONFIGURACION
  getAnimes(){
    this.cargando = true;
    this.errorHttp = false;
    
    this.animesService.getAnimes().then((animes: any) => {
      this.animes = animes;
      this.animesCopia = animes;
      this.cargando = false;
      this.errorHttp = false;
    }).catch(() => {
      this.cargando = false;
      this.errorHttp = true;
    });
    
  };

  checkPlatform(){

    if(this.platforms.platforms().includes('android')){
      this.platform = 'android';
    }else if(this.platforms.platforms().includes('ios')){
      this.platform = 'ios';
    }
    
  }

  //ACCIONES

  irFavoritos(){
    this.navCtrl.navigateForward('favoritos');
  }

  buscar(e){

    let busqueda = e.detail.value.toLowerCase();

    if(busqueda === ''){
      this.animes = this.animesCopia;
      return;
    }

    this.animes = this.animesCopia.filter(anime => anime.nombre.toLowerCase().includes(busqueda));

  }

  async doRefresh(e){
    await this.getAnimes();
    e.target.complete();
  }


}
