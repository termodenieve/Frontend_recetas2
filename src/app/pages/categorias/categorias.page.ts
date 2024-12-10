import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service'; 
import { AlertController } from '@ionic/angular'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  nombre = '';
  descripcion = '';
  id_user: string | null = null;
  token: string | null = null;

  constructor(private api: ApiService, private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
    this.id_user = localStorage.getItem('idusers');
    this.token = localStorage.getItem('authToken');
  }

  

  redirectToshowhome(){
    this.router.navigate(['/home']);
  }


  crearCategoria() {
    if(this.id_user && this.token){
      this.api.crearCategoria(
        this.nombre, 
        this.descripcion, 
        this.id_user,
        this.token ).subscribe({
        next: (data: any) => {
          this.presentAlert('Información', data.message); 
        },
        error: (error) => {
          console.log(error);
          this.presentAlert('Error', 'Intenta más tarde');
        },
      });
    }
  }
  
  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['Aceptar'], 
    });
  
    await alert.present();
  }
  
}
