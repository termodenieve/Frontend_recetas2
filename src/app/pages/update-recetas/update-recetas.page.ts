import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-recetas',
  templateUrl: './update-recetas.page.html',
  styleUrls: ['./update-recetas.page.scss'],
})
export class UpdateRecetasPage implements OnInit {
  recetaForm!: FormGroup;
  categorias: any[] = [];  // Lista de categorías
  idUser!: string;
  idReceta!: string;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Obtener el ID de la receta de la ruta
    this.idReceta = this.route.snapshot.paramMap.get('id') || '';
    const token = localStorage.getItem('authToken');
    const idUser = localStorage.getItem('idusers');
  
    if (!token || !idUser) {
      console.error('Token o ID de usuario no disponibles');
      return;
    }
  
    this.idUser = idUser;
  
    // Convertir idUser a número
    const idUserNumber = parseInt(idUser, 10);
    if (isNaN(idUserNumber)) {
      console.error('ID de usuario inválido');
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
  
    // Cargar categorías
    const categoriasUrl = `${this.apiService.url}categorias/names?id_user=${idUserNumber}`;
    console.log(`URL de solicitud de categorías: ${categoriasUrl}`);
    
    this.apiService.getCategorias(idUserNumber).subscribe(
      (response: any) => {
        // Verificar si las categorías están en la respuesta
        if (response && response.categorias) {
          this.categorias = response.categorias || [];
        } else {
          console.error('Error: No se encontraron categorías');
        }
      },
      (error) => {
        console.error('Error al cargar categorías:', error);
      }
    );
  
    // Cargar los datos de la receta
    const recetaUrl = `${this.apiService.url}recetas/${this.idReceta}`;
    console.log(`URL de solicitud de receta: ${recetaUrl}`);
    
    this.apiService.getRecetaById(this.idReceta, token).subscribe(
      (response: any) => {
        console.log('Respuesta de la receta:', response);
        if (response && response.data) {
          const receta = response.data;
          this.recetaForm.patchValue({
            titulo: receta.titulo,
            descripcion: receta.descripcion,
            instrucciones: receta.instrucciones,
            ingredientes: receta.ingredientes,
            tiempo_coccion: receta.tiempo_coccion,
            id_categoria: receta.id_categoria,  // Establecer la categoría seleccionada
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
      const recetaData = { ...this.recetaForm.value, id_user: this.idUser };
      const token = localStorage.getItem('authToken') || '';

      this.apiService
        .actualizarReceta(
          recetaData.titulo,
          recetaData.descripcion,
          recetaData.ingredientes,
          recetaData.instrucciones,
          recetaData.tiempo_coccion,
          recetaData.imagen,
          recetaData.id_categoria,
          token
        )
        .subscribe(
          (response) => {
            console.log('Receta actualizada con éxito:', response);
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
}
