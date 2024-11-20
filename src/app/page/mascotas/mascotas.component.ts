import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IMascota } from '../../interfaces/Mascota';
import { inject } from '@angular/core';
import { MascotaMiniComponent } from '../../components/mascota-mini/mascota-mini.component';
import { DataSharedService } from '../../services/data-shared.service';
import { RouterModule } from '@angular/router';
import { MascotaService } from '../../services/mascota.service';
import { IUsuario } from '../../interfaces/Usuario';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [RouterModule, CommonModule, MascotaMiniComponent],
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent {
  mascota: MascotaService = inject(MascotaService)
  usuario: IUsuario | null = null;
  mascotas: IMascota[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;  // Mostramos 10 mascotas por página

  constructor(private sharedData: DataSharedService) {}

  ngOnInit() {
    this.sharedData.clear();  // Limpia cualquier dato previo
    this.mascota.traerMascotas().subscribe(data => {
      this.mascotas = data || [];
      this.mascotas.forEach(mascota => {
        this.sharedData.changeData(mascota._id, mascota);
      });
    });
  }

  // Calcula las mascotas que deben mostrarse en la página actual
  get currentMascotas() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.mascotas.slice(startIndex, endIndex);
  }

  // Cargar más mascotas (incrementar página)
  loadMoreMascotas() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Número total de páginas
  get totalPages() {
    return Math.ceil(this.mascotas.length / this.itemsPerPage);
  }
}
