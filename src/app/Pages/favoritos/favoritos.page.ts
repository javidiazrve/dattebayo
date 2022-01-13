import { Component, OnInit } from '@angular/core';
import { Anime } from 'src/interfaces';
import { AnimesService } from '../../Services/animes.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  favoritos: Anime[];

  constructor(
    private animesService: AnimesService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getFavoritos();
  }

  irAtras(){
    this.navCtrl.navigateBack('animes');
  }

  async getFavoritos(){
    this.favoritos = await this.animesService.getFavoritos();
  }

}
