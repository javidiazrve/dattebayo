import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Anime } from 'src/interfaces';
import { Plugins } from '@capacitor/core';
import { Usuario } from '../../interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AnimesService {

  private headers = new HttpHeaders().append("Accept", "application/json").append("Content-Type", "application/json");
  animes: Anime[] = [];
  favoritosId: String[] = [];

  constructor(
    private httpClient: HttpClient,
    private toastCtrl: ToastController
  ) { }

  //PETICIONES
  getAnimes() {
    this.setFavoritos();

    return new Promise<Anime[]>((resolve: any, rejected) => {
      this.httpClient.get(environment.URL, { headers: this.headers }).subscribe((res: any) => {
        this.animes = res.animes;
        resolve(res.animes);
      }, (error: any) => {
        rejected(this.handleError(error.status))
      });
    });
  }

  getAnime(id) {

    return new Promise((resolve: any, rejected) => {
      this.httpClient.get(environment.URL + '/' + id, { headers: this.headers }).subscribe((res: any) => {
        if (!res.ok) {
          console.log(res.err);
        }
        resolve(res.anime)
      }, (error: any) => {
        rejected(this.handleError(error.status))
      });
    });

  }

  addFavorito(id) {

    return new Promise((resolve, rejected) => {
      Storage.get({ key: 'infoUsuario' }).then(infoUsuario => {

        let usuario: Usuario;

        if(!infoUsuario.value) usuario = {favoritos: []};

        else usuario = JSON.parse(infoUsuario.value);

        usuario.favoritos.push(id);

        
        Storage.set({key: 'infoUsuario', value: JSON.stringify(usuario)}).then(()=>{
          this.favoritosId = usuario.favoritos;
          this.mostrarMensaje("Añadido a favoritos");
          resolve(true)  
        });
      
      })
      
    })

  }

  borrarFavorito(id) {

    return new Promise<void>((resolve, rejected) => {

      Storage.get({ key: 'infoUsuario' }).then(res => {

        let usuario: Usuario = JSON.parse(res.value);

        usuario.favoritos = usuario.favoritos.filter(animeid => animeid !== id);

        
        Storage.set({key: 'infoUsuario', value: JSON.stringify(usuario)}).then(()=>{ 
          this.favoritosId = usuario.favoritos;
          this.mostrarMensaje("Eliminado de favoritos");
          resolve()
        });
      })

    })

  }

  async setFavoritos(){
    let usuario: Usuario = JSON.parse((await Storage.get({ key: 'infoUsuario' })).value);

    this.favoritosId = usuario.favoritos? usuario.favoritos : [];
  }

  async getFavoritos() {
    return this.animes.filter(anime => this.favoritosId.includes(anime._id));
  }

  // VALIDACIONES

  checkFav(id){
    return this.favoritosId.includes(id)? true : false;
  }

  setIconFav(id){
    return this.favoritosId.includes(id)? 'heart' : 'heart-outline';
  }

  //HANDLERS

  handleError(status: Number) {

    return {
      ok: false,
      message: 'No se pudo conectar al servidor, intente despues'
    }

  }

  //MENSAJES

  async mostrarMensaje(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      position: "bottom",
      duration: 1000,
      mode: "ios",
      animated: true,
      color: "danger"
    })

    toast.present();
  }

}
