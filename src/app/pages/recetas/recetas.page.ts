import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})
export class RecetasPage implements OnInit {
  titulo = '';
  descripcion = '';
  instrucciones = '';
  ingredientes = '';
  tiempo_coccion: string | any = null;
  imagen = '';
  id_categoria: string | null = null;
  id_user: any | null = null;
  categorias: any[] = [];
  token: any | null = null;

  constructor(private api: ApiService, private alertCtrl: AlertController, private router: Router) {}

  ngOnInit() {
    this.id_user = localStorage.getItem('idusers');
    this.token = localStorage.getItem('authToken');
    this.api.getCate(this.id_user,this.token).subscribe({
      next:(data:any)=> {
        //console.log(data)
          this.categorias=data.data
      },error:(err:any) =>{
          console.log(err)
      },
    })
  }

  
  redirectToshowhome(){
    this.router.navigate(['/home']);
  }


  crearReceta() {
    if (this.id_user && this.token && this.id_categoria) {
      this.api
        .crearReceta(
          this.titulo,
          this.descripcion,
          this.ingredientes,
          this.instrucciones,
          this.tiempo_coccion,
          this.imagen,
          this.id_categoria,
          this.id_user,
          this.token
        )
        .subscribe({
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
