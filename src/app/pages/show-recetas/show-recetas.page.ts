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

  ngOnInit() {
    this.loadRecetas();
  }

  loadRecetas() {
    this.userId = localStorage.getItem('idusers');
    this.token = localStorage.getItem('authToken');

    if (this.userId && this.token) {
      this.api.getReceta(this.userId, this.token).subscribe({
        next: (res: any) => {
          if (res?.data) {
            this.recetas = res.data;
          } else {
            console.error('No data received:', res);
          }
        },
        error: (err) => {
          console.error('Error fetching recetas:', err);
        },
      });
    } else {
      console.warn('User ID or Token is missing.');
    }
  }

  redirectToUpdateRe(idReceta: string) {
    this.router.navigate([`/update-recetas/${idReceta}`]);
  }
  
}
