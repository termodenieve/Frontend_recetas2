import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateCategoriasPageRoutingModule } from './update-categorias-routing.module';

import { UpdateCategoriasPage } from './update-categorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateCategoriasPageRoutingModule
  ],
  declarations: [UpdateCategoriasPage]
})
export class UpdateCategoriasPageModule {}
