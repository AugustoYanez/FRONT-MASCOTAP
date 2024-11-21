import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IMascota } from '../../interfaces/Mascota';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tipoDato } from '../../interfaces/enums';
import { ICaracteristicas } from '../../interfaces/Caracteristica';
import { MascotaService } from '../../services/mascota.service';
import { CaracteristicasService } from '../../services/caracteristicas.service';

export enum Estado {
  EnCasa = "EN MI HOGAR",
  Adoptada = "LO ENCONTRE",
  Perdida = "LO PERDI",
}

@Component({
  selector: 'app-editar-mascota-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './editar-mascota-modal.component.html',
  styleUrls: ['./editar-mascota-modal.component.css']
})
export class EditarMascotaModalComponent {
  mascota: IMascota;
  mensajeExito: string | null = null;
  mensajeError: string[] | null = null;
  estados = Object.values(Estado);
  imagenArchivo: File | null = null; // Para manejar el archivo de imagen
  urlImagen = "";
  url = 'http://localhost:3000/';
  modificarImagen: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IMascota,  public dialogRef: MatDialogRef<EditarMascotaModalComponent>, private http: HttpClient){
    this.mascota = {
      _id: data._id,
      placaID: data.placaID,
      nombre: data.nombre,
      apodo: data.apodo,
      edad: data.edad,
      descripcion: data.descripcion,
      imagen: data.imagen,
      caracteristicas: data.caracteristicas,
      estado: data.estado,
      ubicacion: data.ubicacion,
      solicitud: data.solicitud
    };
  }

  validarCampos(): string[] {
    const errores: string[] = [];

    for (const [key, value] of Object.entries(this.mascota)) {
      if (!value) {
        errores.push(`El campo ${key} no puede estar vacío.`);
      }
    }

    return errores;
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imagenArchivo = file;
    }
  }

  guardarMascota(event: Event): void {
    event.preventDefault();
    this.mensajeError = this.validarCampos().length > 0 ? this.validarCampos() : null;
    if (!this.mensajeError) {
      if (this.imagenArchivo) {
        const imageForm = new FormData();
        imageForm.append('file', this.imagenArchivo, this.imagenArchivo?.name);
        this.http.post<string>(this.url + 'image/upload', imageForm).subscribe(data => {
          this.urlImagen = data;
          this.mascota.imagen = this.urlImagen;
          this.dialogRef.close(this.mascota)
        })
      } else {
        this.dialogRef.close(this.mascota)
      }
    }
  }
  toggleModificarImagen(): void {
    this.modificarImagen = !this.modificarImagen;
  }
}
