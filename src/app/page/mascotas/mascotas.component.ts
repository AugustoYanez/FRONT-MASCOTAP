import { Component, OnInit } from '@angular/core';
import { IMascota } from '../../interfaces/Mascota';
import { MascotaService } from '../../services/mascota.service';
import { Estado, Solicitud } from '../../interfaces/enums';
import { MascotaComponent } from '../../components/mascota/mascota.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [MascotaComponent, CommonModule, FormsModule],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.css'
})
export class MascotasComponent implements OnInit {
  mascotas: IMascota[] = [];
  filteredMascotas: IMascota[] = [];
  searchTerm: string = '';
  noResults: boolean = false;
  filterEstado: Estado | null = null;
  estado = Estado;

  constructor(
    private mascotaService: MascotaService,
  ) {}

  ngOnInit() {
    this.mascotaService.traerMascotas().subscribe(
      data => {
        this.mascotas = data.filter(mascota => {
          return mascota.solicitud === Solicitud.aceptado;
        }) || [];
        this.updatePagina();
      },
      error => {
        console.error('Error al obtener mascotas perdidas:', error);
      }
    );
  }

  updatePagina() {
    this.filteredMascotas = this.mascotas.filter(mascota => {
      const matchesSearchTerm = this.filterMascotasBySearch(mascota);
      const matchesFilter = this.filterMascotasByEstado(mascota);
      return matchesSearchTerm && matchesFilter;
    });
    this.noResults = this.filteredMascotas.length === 0;
  }

  setFilterEstado(estado: Estado | null) {
    this.filterEstado = estado;
    this.updatePagina();
  }

  filterMascotasByEstado(mascota: IMascota) {
    return this.filterEstado === null || mascota.estado === this.filterEstado;
  }

  filterMascotasBySearch(mascota: IMascota) {
    return  mascota.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
  }
}
