import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-recetas',
  templateUrl: './update-recetas.page.html',
  styleUrls: ['./update-recetas.page.scss'],
})
export class UpdateRecetasPage implements OnInit {
  recetaForm!: FormGroup; // Se asegura que el formulario esté definido antes de usarlo

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Inicializa el formulario con controles y validadores
    this.recetaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      instrucciones: ['', Validators.required],
      ingredientes: ['', Validators.required],
      tiempo_coccion: ['', [Validators.required, Validators.min(1)]],
      id_categoria: ['', Validators.required],
      id_user: ['', Validators.required],
      imagen: [null, Validators.required], // Inicializa el campo para la imagen con validador
    });
  }

  actualizarReceta() {
    if (this.recetaForm.valid) {
      console.log('Formulario válido:', this.recetaForm.value);
      // Lógica para actualizar la receta (API o servicio)
    } else {
      console.error('Formulario inválido');
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement; // Convierte el target a HTMLInputElement
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];
      this.recetaForm.get('imagen')?.setValue(file); // Usa el operador seguro para asignar
      console.log('Archivo seleccionado:', file);
    } else {
      this.recetaForm.get('imagen')?.setValue(null); // Limpia el campo si no hay archivo
      console.log('No se seleccionó archivo');
    }
  }
}