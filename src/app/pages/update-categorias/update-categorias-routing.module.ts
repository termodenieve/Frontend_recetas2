import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateCategoriasPage } from './update-categorias.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateCategoriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateCategoriasPageRoutingModule {}
