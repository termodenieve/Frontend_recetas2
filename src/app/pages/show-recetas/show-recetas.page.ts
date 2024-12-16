import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-show-recetas',
  templateUrl: './show-recetas.page.html',
  styleUrls: ['./show-recetas.page.scss'],
})
export class ShowRecetasPage implements OnInit {
  categorias: any[] = [];
  recetas: any[] = [];
  idUser!: string;
  userId: string | null = null;
  token: string | null = null;

  constructor(
    private api: ApiService,
    private router: Router,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem('authToken');
    this.idUser = localStorage.getItem('idusers') || '';
    if (!this.token || !this.idUser) {
      console.error('Token o ID de usuario no disponibles');
      return;
    }
    this.loadRecetas();
    this.cargarCategorias(this.token);
  }

  loadRecetas() {
    this.userId = localStorage.getItem('idusers');
    this.token = localStorage.getItem('authToken');
  
    if (this.userId && this.token) {
      this.api.getReceta2(this.userId, this.token).subscribe({
        next: (res: any) => {
          console.log('Respuesta completa del backend:', res); // Para depurar
  
          // Aquí entra el bloque que mencionas
          if (res?.users) {
            this.recetas = Array.isArray(res.users)
              ? res.users.map((receta: any) => ({
                  ...receta,
                  categorias: receta.categorias || 'General', // Ajusta según tu modelo de datos
                }))
              : [{ ...res.users, categorias: res.users.categorias || 'General' }];
  
            console.log('Recetas procesadas:', this.recetas);
            this.cdr.detectChanges(); // Forzar actualización de la vista si es necesario
          } else {
            console.error('No se encontraron recetas válidas en la respuesta:', res);
          }
        },
        error: (err) => {
          console.error('Error al cargar recetas:', err);
        },
      });
    } else {
      console.error('Faltan el ID de usuario o el token.');
    }
  }
  
  async presentConfirm(idreceta: string) {
    console.log('Confirmando acción para receta ID:', idreceta);
    const alert = await this.alertController.create({
      header: 'Confirmar acción',
      message: '¿Estás seguro de que deseas eliminar esta receta?',
      buttons: [
        { text: 'Cancelar', role: 'cancel', handler: () => console.log('Cancelado') },
        { text: 'Eliminar', handler: () => this.deleteReceta(idreceta) },
      ],
    });

    await alert.present();
  }

  deleteReceta(idreceta: string) {
    const token = localStorage.getItem('authToken');

    if (idreceta && token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.api.borrarReceta(idreceta, headers).subscribe({
        next: (res: any) => {
          console.log('Receta eliminada:', res.message);
          this.recetas = this.recetas.filter(r => r.idrecetas !== idreceta);
        },
        error: (err) => {
          console.error('Error al eliminar la receta:', err);
        },
      });
    } else {
      console.error('ID de receta o token no disponibles');
    }
  }

  cargarCategorias(token: string) {
    const idUserNumber = parseInt(this.idUser, 10);
    if (isNaN(idUserNumber)) {
      console.error('ID de usuario inválido');
      return;
    }

    this.api.getCategorias(idUserNumber).subscribe({
      next: (response: any) => {
        if (response && response.categorias) {
          this.categorias = response.categorias;
          console.log('Categorías cargadas:', this.categorias);
        } else {
          console.error('No se encontraron categorías.');
        }
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      },
    });
  }

  redirectToUpdateRe(idReceta: string) {
    this.router.navigate([`/update-recetas/${idReceta}`]);
  }

  redirectTohome(){
    this.router.navigate(['/home']);
  }
}
