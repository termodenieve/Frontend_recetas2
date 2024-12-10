import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  users: any[] = [];
  userId: string | null = null;
  token: string | null = null;

  constructor(private api: ApiService, private router: Router) {}  

  ngOnInit() {
    this.userId = localStorage.getItem('idusers');
    this.token = localStorage.getItem('authToken');

    if (this.userId && this.token) {
      console.log(this.userId);
      this.api.getUser(this.userId, this.token).subscribe({
        next: (res: any) => {
          this.users = res.data;  
          console.log(this.users);
        },
        error: (err) => {
          console.error('Error al obtener el usuario:', err);
        }
      });
    }
  }

  redirectToUpdateUser() {
    this.router.navigate(['/update-user']);  
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
