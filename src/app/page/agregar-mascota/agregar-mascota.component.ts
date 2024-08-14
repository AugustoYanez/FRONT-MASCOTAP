import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { inject } from '@angular/core';
import { IMascota } from '../../interfaces/Mascota';
import { Router } from '@angular/router';
import { Estado } from '../../interfaces/enums';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-agregar-mascota',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar-mascota.component.html',
  styleUrls: ['./agregar-mascota.component.css']
})
export class AgregarMascotaComponent {
  userService: UserService = inject(UserService);
  router: Router = inject(Router);
  mascotaForm: FormGroup;
  currentStep: number = 0; // Para controlar el paso actual
  totalSteps: number = 8;  // Total de pasos en el formulario
  enumEstado: typeof Estado = Estado;
  imagenArchivo: File | null = null; // Para manejar el archivo de imagen
  url = 'http://localhost:3000/'
  urlImagen = "";

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.mascotaForm = this.fb.group({
      placaID: ['', Validators.required],
      nombre: ['', Validators.required],
      apodo: ['', Validators.required],
      edad: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      estado: ['', Validators.required],
      descripcion: ['', Validators.required],
      caracteristicas: ['', Validators.required]
    });
  }

  getEnumValues(enumType: any): string[] {
    return Object.keys(enumType).map(key => enumType[key]);
  }

  nextStep() {
    if (this.currentStep < this.totalSteps - 1) {
      if (this.isCurrentStepValid()) {
        this.currentStep++;
      }
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  isCurrentStepValid(): boolean {
    const stepControls = [
      ['placaID'],
      ['nombre'],
      ['apodo'],
      ['edad'],
      ['estado'],
      ['descripcion'],
      ['imagen'],
      ['caracteristicas']
    ];
    const currentStepControls = stepControls[this.currentStep];
    let isValid = true;

    currentStepControls.forEach(controlName => {
      const control = this.mascotaForm.get(controlName);
      if (control && control.invalid) {
        control.markAsDirty();
        control.markAsTouched();
        isValid = false;
      }
    });

    return isValid;
  }

  get progressPercentage() {
    return (this.currentStep / this.totalSteps) * 100;
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imagenArchivo = file;
    }
  }

  onSubmit() {
    if (this.mascotaForm.valid) {
      if (this.imagenArchivo) {
        const imageForm = new FormData();
        imageForm.append('file', this.imagenArchivo, this.imagenArchivo?.name);
        const url = this.http.post<string>(this.url + 'image/upload', imageForm)
        url.subscribe({
          next: (data) => {
            console.log('Imagen subida correctamente:', data);
            this.urlImagen = data;
            let nuevaMascota: IMascota = {
              ...this.mascotaForm.value,
              imagen: this.urlImagen || ""  // Agregar la url de la imagen al objeto mascota si hay imagen subida
            };
            this.userService.agregarMascota(nuevaMascota).subscribe({
              next: (respuesta) => {
                this.router.navigate(['/mascotas']);
              },
              error: (error) => {
                console.error('Error al agregar mascota:', error);
              }
            });
          },
          error: (err: any) => {
            return throwError(() => err)
          }
        })
      }
    } else {
      console.log('Formulario no válido', this.mascotaForm.errors);
      console.log('Errores en los campos:', this.mascotaForm.controls);
    }
  }
}
