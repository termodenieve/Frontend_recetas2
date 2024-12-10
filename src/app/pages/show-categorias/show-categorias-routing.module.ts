import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowCategoriasPage } from './show-categorias.page';

const routes: Routes = [
  {
    path: '',
    component: ShowCategoriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowCategoriasPageRoutingModule {}
