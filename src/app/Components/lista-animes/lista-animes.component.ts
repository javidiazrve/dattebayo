import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Anime } from '../../../interfaces';
import { NavController } from '@ionic/angular';
import { AnimesService } from '../../Services/animes.service';
import { Plugins } from '@capacitor/core';
import { Subject } from 'rxjs';

const {Storage} = Plugins;

@Component({
  selector: 'app-lista-animes',
  templateUrl: './lista-animes.component.html',
  styleUrls: ['./lista-animes.component.scss'],
})
export class ListaAnimesComponent implements OnInit {

  @Input() animes: Anime[];
  @Input() pagina: string;
  @Output() refresh = new EventEmitter<void>();
  
  constructor(
    private navCtrl: NavController,
    private animesService: AnimesService) { }

  ngOnInit() {
    console.log(this.pagina);
  }

  verAnime(id){
    this.navCtrl.navigateForward(['/anime',id]);
  }

  setIcon(id){
    return this.animesService.setIconFav(id);
  }

  async switchFavorito(id){
    
    if(this.animesService.checkFav(id)){
      this.animesService.borrarFavorito(id).then(()=> {
        if(this.pagina == 'favoritos') this.refresh.emit();
      });
      return;
    }

    this.animesService.addFavorito(id).then(()=>{
        if(this.pagina == 'favoritos') this.refresh.emit();
    });
  }

  async refreshFavoritos(){
    this.animes = await this.animesService.getFavoritos();
  }
}
