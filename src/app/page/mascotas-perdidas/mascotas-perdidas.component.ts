// page/mascotas-perdidas/mascotas-perdidas.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IMascota } from '../../interfaces/Mascota';
import { DataSharedService } from '../../services/data-shared.service';
import { CommonModule } from '@angular/common';
import { Contacto, Documento, Rol } from '../../interfaces/enums';
import { IUsuario } from '../../interfaces/Usuario';
import { inject } from '@angular/core';
import { RouterOutlet, Routes, RouterModule } from '@angular/router';
import { MascotaMiniComponent } from '../../components/mascota-mini/mascota-mini.component';
import { MascotaPerdidaCardComponent } from '../../mascotaperdidacard/mascotaperdidacard.component';

@Component({
  selector: 'app-mascotas-perdidas',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, MascotaMiniComponent, MascotaPerdidaCardComponent],
  templateUrl: './mascotas-perdidas.component.html',
  styleUrls: ['./mascotas-perdidas.component.css']
})
export class MascotasPerdidasComponent implements OnInit {
  mascotasPerdidas: IMascota[] = [];

  constructor(
    private userService: UserService,
    private sharedData: DataSharedService
  ) {}

  ngOnInit() {
    this.sharedData.clear();  // Limpia cualquier dato previo
    this.userService.traerMascotasPerdidas().subscribe(
      data => {
        this.mascotasPerdidas = data || [];
        this.mascotasPerdidas.forEach(mascota => {
          this.sharedData.changeData(mascota._id, mascota);
        });
      },
      error => {
        console.error('Error al obtener mascotas perdidas:', error);
      }
    );
  }
}

