import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { inject } from '@angular/core';
import { IMascota } from '../../interfaces/Mascota';
import { Router } from '@angular/router';
import { Estado, tipoDato } from '../../interfaces/enums';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { MascotaService } from '../../services/mascota.service';
import { CaracteristicasService } from '../../services/caracteristicas.service';
import { ICaracteristicas } from '../../interfaces/Caracteristica';

@Component({
  selector: 'app-agregar-mascota',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar-mascota.component.html',
  styleUrls: ['./agregar-mascota.component.css']
})
export class AgregarMascotaComponent {
  enum = tipoDato;
  caracteristicasDinamicas: ICaracteristicas[] = [];
  router: Router = inject(Router);
  mascotaForm: FormGroup;
  currentStep: number = 0; // Para controlar el paso actual  
  totalSteps: number = 9;  // Total de pasos en el formulario  
  enumEstado: typeof Estado = Estado;
  imagenArchivo: File | null = null; // Para manejar el archivo de imagen  
  url = 'http://localhost:3000/';
  urlImagen = "";
  preguntaUbicacion: string = '¿Cuál es la ubicación de la mascota?';


  constructor(private fb: FormBuilder, private http: HttpClient, private mascotaService: MascotaService, private caracteristicasService: CaracteristicasService, private userService: UserService) {
    this.mascotaForm = this.fb.group({
      placaID: ['', Validators.required],
      nombre: ['', Validators.required],
      apodo: ['', Validators.required],
      edad: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      estado: ['', Validators.required],
      ubicacion: ['', Validators.required], // Añadir campo de ubicación  
      descripcion: ['', Validators.required],
      caracteristicas: this.fb.array([]),
      imagen: [''] // Asegúrate de incluir el campo 'imagen' en el formulario  
    });
  }

  ngOnInit() {
    // Suscribirse a los cambios del estado  
    this.mascotaForm.get('estado')?.valueChanges.subscribe((estado: Estado) => {
      this.onEstadoChange(estado);
      this.cargarCaracteristicas()
    });
  }

  cargarCaracteristicas() {
    this.caracteristicasDinamicas
    this.caracteristicasService.getData().subscribe((res) => {
      this.caracteristicasDinamicas = res;
      const caracteristicasFormArray = this.mascotaForm.get('caracteristicas') as FormArray;
      this.caracteristicasDinamicas.forEach((caracteristica) => {
        const control = this.crearControlPorTipo(caracteristica.tipoDato);
        caracteristicasFormArray.push(control);
      }); 
    })
  }

  crearControlPorTipo(tipo: tipoDato) {
    switch (tipo) {
      case this.enum.string:
        return this.fb.control('', Validators.required);
      case this.enum.int:
        return this.fb.control('', [Validators.required, Validators.pattern("^[0-9]*$")]);
      case this.enum.boolean:
        return this.fb.control(false); // Default para boolean
      default:
        return this.fb.control('', Validators.required); // Fallback a string
    }
  }

  get caracteristicasControls(): FormControl[] {
    return (this.mascotaForm.get('caracteristicas') as FormArray).controls as FormControl[];
  }
  

  armarCaracteristicas() {
    const formValues = this.mascotaForm.value;
    
    const caracteristicasString = formValues.caracteristicas
        .map((valor: any, index: number) => {
          const tipo = this.caracteristicasDinamicas[index].tipoDato;
          const nombre = this.caracteristicasDinamicas[index].nombre;

          // Transformar boolean a "Sí/No"
          if (tipo === this.enum.boolean) {
            valor = valor ? 'Sí' : 'No';
          }

          return `${nombre}: ${valor}`;
        })
        .join(', ');
    return caracteristicasString;
  }

  onEstadoChange(estado: Estado) {
    switch (estado) {
      case Estado.EnCasa:
        this.preguntaUbicacion = '¿En donde vive la mascota?';
        break;
      case Estado.Encontrada:
        this.preguntaUbicacion = '¿Dónde encontraste la mascota?';
        break;
      case Estado.Perdida:
        this.preguntaUbicacion = '¿Dónde perdiste la mascota?';
        break;
      default:
        this.preguntaUbicacion = '¿Cuál es la ubicación de la mascota?';
        break;
    }
  }

  getEnumValues(enumType: any): string[] {
    return Object.keys(enumType).map(key => enumType[key]);
  }

  nextStep() {
    if (this.currentStep < this.totalSteps - 1 && this.isCurrentStepValid()) {
      this.currentStep++;
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
      ['ubicacion'],
      ['descripcion'],
      ['imagen'], // Aquí es necesario el campo 'imagen' si se va a validar  
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

  onImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.imagenArchivo = fileInput.files[0];
    }
  }

  onSubmit() {
    if (this.mascotaForm.valid) {
      if (this.imagenArchivo) {
        const imageForm = new FormData();
        imageForm.append('file', this.imagenArchivo, this.imagenArchivo.name);
        this.http.post<string>(this.url + 'image/upload', imageForm).subscribe({
          next: (data) => {
            console.log('Imagen subida correctamente:', data);
            this.urlImagen = data;
            const nuevaMascota: IMascota = {
              ...this.mascotaForm.value,
              imagen: this.urlImagen || "",  // Agregar la url de la imagen al objeto mascota
              caracteristicas: this.armarCaracteristicas()  
            };
            this.mascotaService.agregarMascota(nuevaMascota).subscribe({
              next: () => this.router.navigate(['/mascotas']),
              error: (error) => console.error('Error al agregar mascota:', error)
            });
          },
          error: (err) => {
            console.error('Error al subir imagen:', err);
            return throwError(() => err);
          }
        });
      }
    } else {
      console.log('Formulario no válido', this.mascotaForm.errors);
      console.log('Errores en los campos:', this.mascotaForm.controls);
    }
  }
}
