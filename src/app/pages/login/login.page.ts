import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = '';
  pass = '';

  constructor(private api: ApiService, private alertCtrl: AlertController, private router:Router) {}

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

  login() {
    this.api.login(this.user, this.pass).subscribe({
      next: (data: any) => {
        localStorage.setItem('idusers', data.user.idusers);
        localStorage.setItem('username', data.username);
        localStorage.setItem('authToken', data.token);
        this.presentAlert('informacion', data.message);
        this.router.navigate(['/home'])
      },
      error: (error) => {
        console.log(error);
        this.presentAlert('informacion', 'Intenta mas tarde');
      },
    });
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