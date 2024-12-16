import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {

  name = '';
  username = '';
  password = '';
  email = '';
  userId: number | null = null; // Ajuste de tipo a número
  token: string | null = null; 

  constructor(private api: ApiService, private alertCtrl: AlertController, private router: Router ) {}

  ngOnInit() {
    // Recuperar datos de localStorage
    const userIdString = localStorage.getItem('idusers');
    this.token = localStorage.getItem('authToken');

    if (userIdString) {
      const userId = Number(userIdString);
      if (isNaN(userId)) {
        console.error('ID del usuario no es válido.');
        this.presentAlert('Error', 'El ID del usuario es inválido.');
        return;
      }
      this.userId = userId; // Asignar ID válido
    }

    console.log('ID del usuario:', this.userId);

    // Obtener datos del usuario
    if (this.userId) {
      this.api.obtenerUsuarioPorId(this.userId.toString()).subscribe({
        next: (response: any) => {
          console.log('Datos del usuario obtenidos:', response);
          this.name = response.users.name;
          this.username = response.users.username;
          this.email = response.users.email;
        },
        error: (error: any) => {
          console.error('Error al obtener los datos del usuario:', error);
          this.presentAlert('Error', 'No se pudieron cargar los datos del usuario.');
        },
      });
    }
  }

  actualizarUser() {
    if (!this.userId) {
        this.presentAlert('Error', 'No se identificó el usuario.');
        return;
    }

    console.log('Datos enviados al backend:', {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
        userId: this.userId,
    });

    this.api.actualizarUser(this.name, this.username, this.email, this.password, Number(this.userId)).subscribe({
        next: (data: any) => {
            this.presentAlert('Información', data.message);
            this.router.navigate(['/perfil']); 
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
