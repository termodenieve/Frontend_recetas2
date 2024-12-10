import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-recetas',
  templateUrl: './show-recetas.page.html',
  styleUrls: ['./show-recetas.page.scss'],
})
export class ShowRecetasPage implements OnInit {
  recetas: any[] = [];
  userId: string | null = null;
  token: string | null = null;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(){
    this.userId = localStorage.getItem('idusers');
    this.token = localStorage.getItem('authToken');

    if(this.userId && this.token){
      console.log(this.userId);
      this.api.getReceta(this.userId, this.token).subscribe({
        next: (res: any) => {
          this.recetas.push(...res.data);
          console.log(this.recetas)
        }
      })
    }
  }

  redirectToUpdateRe() {
    this.router.navigate(['/update-recetas']);  
  }
  redirectToshowhome(){
    this.router.navigate(['/home']);
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

  

}
