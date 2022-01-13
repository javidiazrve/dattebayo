import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Anime } from 'src/interfaces';
import { AnimesService } from '../../Services/animes.service';
import { Episodio } from '../../../interfaces';
import { CapituloPage } from '../../Modals/capitulo/capitulo.page';
import { SinopsisPage } from '../../Modals/sinopsis/sinopsis.page';
import { ActionSheetOptions, AlertOptions } from '@capacitor/core';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.page.html',
  styleUrls: ['./anime.page.scss'],
})
export class AnimePage implements OnInit {

  anime: Anime;
  episodios: Episodio[];
  temporada = '1';
  cargando: Boolean = true;
  errorHttp: Boolean = false;
  sinopsisDisplay = 'none';

  customAlertOptions: any = {
    header: 'Temporadas',
    translucent: true,
    mode: "ios",
  };

  constructor(
    private route: ActivatedRoute,
    private animesService: AnimesService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.getAnime();
  }

  getAnime() {
    let id = this.route.snapshot.paramMap.get('id')
    this.cargando = true;
    this.animesService.getAnime(id).then((res: Anime) => {
      this.anime = res;
      this.anime.temporadas = this.anime.temporadas.filter(temp => temp.status === true);
      this.getEpisodios();
      this.cargando = false;
    }).catch(err => {
      console.log(err);
      this.cargando = false;
      this.errorHttp = true;
    })
  }

  getEpisodios(){
    this.episodios = this.anime.temporadas[Number(this.temporada) - 1].episodios;
  }

  selTemporada(e){
    this.temporada = e.detail.value;
    this.getEpisodios();
  }

  switchFavorito(id){
    if(this.animesService.checkFav(id)){
      this.animesService.borrarFavorito(id);
    }else{
      this.animesService.addFavorito(id);
    }
  }

  setIcon(id){
    return this.animesService.setIconFav(id);
  }

  async verSinopsis(){

    const modal = await this.modalCtrl.create({
      component: SinopsisPage,
      componentProps: {
        sinopsis: this.anime.descripcion,
        foto: this.anime.fotoBackground
      },
      cssClass: "modalSinopsis",
      mode: "ios",
      swipeToClose: true
    })

    modal.present();

  }

  async verEpisodio(episodio: Episodio) {

    const modal = await this.modalCtrl.create({
      component: CapituloPage,
      componentProps: {
        episodio,
        anime: this.anime
      },
      cssClass: "modal-episodio",
      animated: true,
      backdropDismiss: true,
      showBackdrop: true,
      mode: "ios",
      swipeToClose: true
    })

    modal.present();

  }

  irAtras(){
    this.navCtrl.navigateBack(['animes']);
  }


}
