import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Contacto, Documento, Rol } from '../../interfaces/enums';
import { IUsuario } from '../../interfaces/Usuario';
import { UserService } from '../../services/user.service';
import { IMascota } from '../../interfaces/Mascota';
import { inject } from '@angular/core';
import { RouterOutlet, Routes, RouterModule } from '@angular/router';
import { MascotaMiniComponent } from '../../components/mascota-mini/mascota-mini.component';
import { DataSharedService } from '../../services/data-shared.service';
import { MascotaService } from '../../services/mascota.service';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, MascotaMiniComponent],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.css'
})
export class MascotasComponent {
  mascota: MascotaService = inject(MascotaService)
  usuario: IUsuario | null = null;
  mascotas: IMascota[] = [];

  constructor(private sharedData: DataSharedService) {

  }

  ngOnInit() {
    this.mascota.traerMascotas().subscribe(data => {
      this.mascotas = data || [];
      this.mascotas.forEach(mascota => {
        this.sharedData.changeData(mascota._id, mascota)
      });
      this.sharedData.getAllData().subscribe(data => {
        this.mascotas = data;
      })
    });
  }



}
