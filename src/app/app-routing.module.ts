import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },

  
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'recetas',
    loadChildren: () => import('./pages/recetas/recetas.module').then( m => m.RecetasPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./pages/categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'show-categorias',
    loadChildren: () => import('./pages/show-categorias/show-categorias.module').then( m => m.ShowCategoriasPageModule)
  },
  {
    path: 'show-recetas',
    loadChildren: () => import('./pages/show-recetas/show-recetas.module').then( m => m.ShowRecetasPageModule)
  },
  {
    path: 'update-recetas',
    loadChildren: () => import('./pages/update-recetas/update-recetas.module').then( m => m.UpdateRecetasPageModule)
  },
  {
    path: 'update-categorias',
    loadChildren: () => import('./pages/update-categorias/update-categorias.module').then( m => m.UpdateCategoriasPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'update-user',
    loadChildren: () => import('./pages/update-user/update-user.module').then( m => m.UpdateUserPageModule)
  },
  {
    path: 'update-recetas/:id',
    loadChildren: () => import('./pages/update-recetas/update-recetas.module').then(m => m.UpdateRecetasPageModule)
  },
  
  
  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
