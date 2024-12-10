import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  name = '';
  username = '';
  password = '';
  email = '';

  constructor(
    private api: ApiService,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {

    
  }

  redirectToShowCat(){
    this.router.navigate(['/show-categorias']);
  }

  redirectToShowUser(){
    this.router.navigate(['/perfil']);
  }

  redirectToShowRece(){
    this.router.navigate(['/show-recetas']);
  }

  redirectToshowhome(){
    this.router.navigate(['/home']);
  }



  registrar() {
    this.api.register(this.username, this.email, this.password, this.name).subscribe({
      next: (data: any) => {
        // Almacenamos la información del usuario en el localStorage
        localStorage.setItem('username', this.username);
        localStorage.setItem('email', this.email);
        
        // Mostrar mensaje de éxito
        this.presentAlert('Información', data.message).then(() => {
          // Redirigir a la página de inicio
          this.router.navigate(['/home']);
        });
      },
      error: (error: any) => {
        this.presentAlert('Información', 'Intenta más tarde');
      }
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
