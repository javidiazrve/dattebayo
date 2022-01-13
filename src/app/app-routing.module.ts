import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Pages/animes/animes.module').then(m => m.AnimesPageModule),
  },
  {
    path: 'animes',
    loadChildren: () => import('./Pages/animes/animes.module').then(m => m.AnimesPageModule),
  },
  {
    path: 'anime/:id',
    loadChildren: () => import('./Pages/anime/anime.module').then( m => m.AnimePageModule),
  },
  {
    path: 'anime',
    loadChildren: () => import('./Pages/anime/anime.module').then( m => m.AnimePageModule),
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./Pages/favoritos/favoritos.module').then(m => m.FavoritosPageModule),
  },
  {
    path: 'capitulo',
    loadChildren: () => import('./Modals/capitulo/capitulo.module').then( m => m.CapituloPageModule)
  },
  {
    path: 'sinopsis',
    loadChildren: () => import('./Modals/sinopsis/sinopsis.module').then( m => m.SinopsisPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
