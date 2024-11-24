import { Component, Input } from '@angular/core';
import { IMascota } from '../../interfaces/Mascota';
import { MatDialog } from '@angular/material/dialog';
import { MascotaService } from '../../services/mascota.service';
import { CaracteristicasService } from '../../services/caracteristicas.service';
import { Solicitud } from '../../interfaces/enums';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitud-mascota',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './solicitud-mascota.component.html',
  styleUrl: './solicitud-mascota.component.css'
})
export class SolicitudMascotaComponent {
  @Input() mascota!: IMascota;
  solicitudes = Object.values(Solicitud);

  constructor(private mascotaService: CaracteristicasService) {}

  actualizarSolicitud(mascota: any) {
    this.mascotaService.actualizarSolicitud(mascota)
      .subscribe({
        next: () => {
          
          console.log(`Solicitud de la mascota ${mascota.nombre} actualizada a ${mascota.solicitud}`);
        }
      });
  }
  
}
