import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowRecetasPage } from './show-recetas.page';

const routes: Routes = [
  {
    path: '',
    component: ShowRecetasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowRecetasPageRoutingModule {}
