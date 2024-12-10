import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowCategoriasPageRoutingModule } from './show-categorias-routing.module';

import { ShowCategoriasPage } from './show-categorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowCategoriasPageRoutingModule
  ],
  declarations: [ShowCategoriasPage]
})
export class ShowCategoriasPageModule {}
