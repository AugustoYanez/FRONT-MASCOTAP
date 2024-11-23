import { Component, OnInit, inject } from '@angular/core';
import { IMascota } from '../../interfaces/Mascota';
import { MascotaService } from '../../services/mascota.service';
import { CommonModule } from '@angular/common';
import { SolicitudMascotaComponent } from '../../components/solicitud-mascota/solicitud-mascota.component';
import { Solicitud } from '../../interfaces/enums';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [CommonModule, SolicitudMascotaComponent],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css'
})
export class SolicitudesComponent implements OnInit{

  mascota: MascotaService = inject(MascotaService)
  mascotas: IMascota[] = [];
  constructor() {}

  ngOnInit() {
    this.mascota.traerMascotas().subscribe(data => {
      this.mascotas = data.filter(mascota => {
        return mascota.solicitud === Solicitud.espera
      }) || [];
    });
  }
}
