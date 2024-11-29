import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IMascota } from '../../interfaces/Mascota';
import { MascotaService } from '../../services/mascota.service';
import { Estado, Solicitud } from '../../interfaces/enums';
import { MascotaComponent } from '../../components/mascota/mascota.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { IMascotaPaginada } from '../../interfaces/Paginacion';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [MascotaComponent, CommonModule, FormsModule, MatPaginatorModule],
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent implements OnInit {
  mascotas: IMascota[] = [];
  filteredMascotas: IMascota[] = [];
  paginatedMascotas: IMascota[] = [];
  searchTerm: string = '';
  noResults: boolean = false;
  filterEstado: Estado | null = null;
  estado = Estado;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 3; 
  pageIndex = 0; 
  totalMascotas = 0;

  constructor(
    private mascotaService: MascotaService
  ) {}

  ngOnInit() {
    this.fetchMascotas()
  }

  fetchMascotas(){
    const page = this.pageIndex + 1; 
    const limit = this.pageSize;
    this.mascotaService.traerMascotaPagina(page, limit).subscribe(
      (data: IMascotaPaginada) => {
        this.mascotas = data.mascotas.filter(mascota => mascota.solicitud === Solicitud.aceptado) || [];
        this.totalMascotas = data.total
        console.log(data);
        
        this.updatePaginatedMascotas(this.mascotas);
      },
      error => {
        console.error('Error al obtener mascotas:', error);
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
    this.updatePaginatedMascotas(this.filteredMascotas);
  }

  updatePaginatedMascotas(mascotas: IMascota[]) {
    this.paginatedMascotas = mascotas;
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize; 
    this.fetchMascotas();
  }

  setFilterEstado(estado: Estado | null) {
    this.filterEstado = estado;
    this.updatePagina();
  }

  filterMascotasByEstado(mascota: IMascota) {
    return this.filterEstado === null || mascota.estado === this.filterEstado;
  }

  filterMascotasBySearch(mascota: IMascota) {
    return mascota.nombre.toLowerCase().includes(this.searchTerm.toLowerCase());
  }
}
