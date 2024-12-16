import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-update-recetas',
  templateUrl: './update-recetas.page.html',
  styleUrls: ['./update-recetas.page.scss'],
})
export class UpdateRecetasPage implements OnInit {
  recetaForm!: FormGroup;
  
  categorias: any[] = [];
  idUser!: string;
  idReceta!: string;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.idReceta = this.route.snapshot.paramMap.get('id') || '';
    const token = localStorage.getItem('authToken');
    this.idUser = localStorage.getItem('idusers') || '';

    if (!token || !this.idUser) {
      console.error('Token o ID de usuario no disponibles');
      return;
    }

    if (!this.idReceta) {
      console.error('ID de receta no proporcionado.');
      return;
    }

    // Inicializar formulario
    this.recetaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      instrucciones: ['', Validators.required],
      ingredientes: ['', Validators.required],
      tiempo_coccion: ['', [Validators.required, Validators.min(1)]],
      id_categoria: ['', Validators.required],
      imagen: [null],
    });

    this.cargarCategorias(token);
    this.cargarReceta(token);
  }

  cargarCategorias(token: string) {
    const idUserNumber = parseInt(this.idUser, 10);
    if (isNaN(idUserNumber)) {
      console.error('ID de usuario inválido');
      return;
    }

    this.apiService.getCategorias(idUserNumber).subscribe(
      (response: any) => {
        if (response && response.categorias) {
          this.categorias = response.categorias;
        } else {
          console.error('Error: No se encontraron categorías');
        }
      },
      (error) => {
        console.error('Error al cargar categorías:', error);
      }
    );
  }

  cargarReceta(token: string) {
    this.apiService.getReceta(this.idReceta, token).subscribe(
      (response: any) => {
        if (response && response.users) {
          const receta = response.users;
          this.recetaForm.patchValue({
            titulo: receta.titulo,
            descripcion: receta.descripcion,
            instrucciones: receta.instrucciones,
            ingredientes: receta.ingredientes,
            tiempo_coccion: receta.tiempo_coccion,
            id_categoria: receta.id_categoria,
          });
        } else {
          console.error('Error: No se encontraron datos de la receta');
        }
      },
      (error) => {
        console.error('Error al cargar receta:', error);
      }
    );
  }

  actualizarReceta() {
    if (this.recetaForm.valid) {
      const recetaData = {
        ...this.recetaForm.value,
        imagen: this.recetaForm.get('imagen')?.value,
        id_user: this.idUser,
        idrecetas: this.idReceta,
       
      };

      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('Token no encontrado');
        return;
      }

      // Agregar el token a las cabeceras
      




      this.apiService
        .actualizarReceta(
          recetaData.titulo,
          recetaData.descripcion,
          recetaData.ingredientes,
          recetaData.instrucciones,
          recetaData.tiempo_coccion,
          recetaData.imagen,
          recetaData.id_categoria,
          recetaData.idrecetas,
          token
          
          
        )
        .subscribe(
          (response) => {
            console.log('Receta actualizada con éxito:', response);
            this.redirectToshowhome();
          },
          (error) => {
            console.error('Error al actualizar receta:', error);
          }
        );
    } else {
      console.error('Formulario inválido');
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];
      this.recetaForm.get('imagen')?.setValue(file);
    } else {
      this.recetaForm.get('imagen')?.setValue(null);
    }
  }

  redirectToshowhome() {
    this.router.navigate(['/home']);
  }
}
