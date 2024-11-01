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

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, MascotaMiniComponent],
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent {
  user: UserService = inject(UserService);
  usuario: IUsuario | null = null;
  mascotas: IMascota[] = [];

  constructor(private sharedData: DataSharedService) {}

  ngOnInit() {
    this.sharedData.clear();  // Limpia cualquier dato previo
    this.user.traerMascotas().subscribe(data => {
      this.mascotas = data || [];
      this.mascotas.forEach(mascota => {
        this.sharedData.changeData(mascota._id, mascota);
      });
    });
  }
}

