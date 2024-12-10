import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {}

  onClick(){
    console.log("hola")
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

  redirectToAddCat(){ 
    console.log('cola');
    this.router.navigate(['/categorias']);
  }
  redirectToAddRece(){
    this.router.navigate(['/recetas'])
  }

  redirectToAddUser(){
    this.router.navigate(['/registrar'])
  }

  redirectTologin(){
    this.router.navigate(['/login'])
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('idusers');
    this.router.navigate(['/home']); 
  }

 

  
  
}
