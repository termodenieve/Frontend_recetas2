import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateRecetasPage } from './update-recetas.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateRecetasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateRecetasPageRoutingModule {}
