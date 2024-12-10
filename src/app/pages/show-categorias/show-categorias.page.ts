import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-categorias',
  templateUrl: './show-categorias.page.html',
  styleUrls: ['./show-categorias.page.scss'],
})
export class ShowCategoriasPage implements OnInit {
  categorias: any[] = [];
  userId: string | null = null;
  token: string | null = null;

  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit(){
    this.userId = localStorage.getItem('idusers');
    this.token = localStorage.getItem('authToken');

    if(this.userId && this.token){
      console.log(this.userId);
      this.api.getCate(this.userId, this.token).subscribe({
        next: (res: any) => {
          this.categorias.push(...res.data);
          console.log(this.categorias)
        }
      })
    }
  }
  redirectToUpdateCate() {
    this.router.navigate(['/update-categorias']);  
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
