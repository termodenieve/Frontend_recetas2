import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateRecetasPageRoutingModule } from './update-recetas-routing.module';
import { UpdateRecetasPage } from './update-recetas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateRecetasPageRoutingModule,
    ReactiveFormsModule,
    
  ],
  declarations: [UpdateRecetasPage]
})
export class UpdateRecetasPageModule {}
