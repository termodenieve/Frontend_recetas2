import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service'; 
import { AlertController } from '@ionic/angular'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-categorias',
  templateUrl: './update-categorias.page.html',
  styleUrls: ['./update-categorias.page.scss'],
})
export class UpdateCategoriasPage implements OnInit {
  nombre = '';
  descripcion = '';
  userId: string | null = null;
  token: string | null = null;

  constructor(private api: ApiService, private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
    this.userId = localStorage.getItem('idusers');
    this.token = localStorage.getItem('authToken');
  }

  actualizarCate() {
    if (!this.userId ) {
      this.presentAlert('Error', 'no se identificó el usuario.');
      return;
    }

    this.api.actualizarCate(this.nombre, this.descripcion, this.userId,).subscribe({
      next: (data: any) => {
        this.presentAlert('Información', data.message);
        this.router.navigate(['/show-categorias']); 
      },
      error: (error: any) => {
        console.error('Error en la actualización:', error);
        this.presentAlert('Error', 'Error al actualizar el usuario. Intenta más tarde.');
      }
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
}