import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowRecetasPageRoutingModule } from './show-recetas-routing.module';

import { ShowRecetasPage } from './show-recetas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowRecetasPageRoutingModule
  ],
  declarations: [ShowRecetasPage]
})
export class ShowRecetasPageModule {}
