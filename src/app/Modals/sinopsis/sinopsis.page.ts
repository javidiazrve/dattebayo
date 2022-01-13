import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sinopsis',
  templateUrl: './sinopsis.page.html',
  styleUrls: ['./sinopsis.page.scss'],
})
export class SinopsisPage implements OnInit {

  sinopis: String = '';
  fotoUrl: String = '';

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.sinopis = this.navParams.get('sinopsis');
    this.fotoUrl = this.navParams.get('foto');
  }

  cerrar(){
    this.modalCtrl.dismiss();
  }

}
