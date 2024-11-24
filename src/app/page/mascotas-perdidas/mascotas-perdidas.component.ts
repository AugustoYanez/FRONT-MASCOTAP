import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IMascota } from '../../interfaces/Mascota';
import { DataSharedService } from '../../services/data-shared.service';
import { CommonModule } from '@angular/common';
import { MascotaMiniComponent } from '../../components/mascota-mini/mascota-mini.component';
import { MascotaPerdidaCardComponent } from '../../mascotaperdidacard/mascotaperdidacard.component';
import { FormsModule } from '@angular/forms';
import { MascotaService } from '../../services/mascota.service';

@Component({
  selector: 'app-mascotas-perdidas',
  standalone: true,
  imports: [FormsModule, CommonModule, MascotaMiniComponent, MascotaPerdidaCardComponent],
  templateUrl: './mascotas-perdidas.component.html',
  styleUrls: ['./mascotas-perdidas.component.css']
})
export class MascotasPerdidasComponent implements OnInit {
  mascotasPerdidas: IMascota[] = []; // Todas las mascotas perdidas
  mascotasPagina: IMascota[] = []; // Mascotas que se mostrarán en la página
  page: number = 1; // Página actual
  pageSize: number = 4; // Número de mascotas por página
  searchTerm: string = ''; // Término de búsqueda por nombre
  noResults: boolean = false; // Indica si no se encontraron resultados

  constructor(
    private mascotaService: MascotaService,
    private sharedData: DataSharedService
  ) {}

  ngOnInit() {
    this.sharedData.clear();  // Limpia cualquier dato previo
    this.mascotaService.traerMascotasPerdidas().subscribe(
      data => {
        this.mascotasPerdidas = data || [];
        this.mascotasPerdidas.forEach(mascota => {
          this.sharedData.changeData(mascota._id, mascota);
        });
        this.updatePagina(); // Actualiza la página inicial
      },
      error => {
        console.error('Error al obtener mascotas perdidas:', error);
      }
    );
  }

  // Actualiza la lista de mascotas a mostrar según la página actual y filtro de búsqueda
  updatePagina() {
    const filteredMascotas = this.filterMascotasBySearch();
    this.noResults = filteredMascotas.length === 0;
    const startIndex = (this.page - 1) * this.pageSize;
    this.mascotasPagina = filteredMascotas.slice(startIndex, startIndex + this.pageSize);
  }

  // Filtra las mascotas por el nombre (caso insensible)
  filterMascotasBySearch() {
    return this.mascotasPerdidas.filter(mascota => 
      mascota.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Carga más mascotas (cambia la página)
  cargarMas() {
    this.page++;
    this.updatePagina();
  }

  // Regresa a la página anterior
  volverAtras() {
    if (this.page > 1) {
      this.page--;
    }
    this.updatePagina();
  }
}
