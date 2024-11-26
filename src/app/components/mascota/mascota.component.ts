import { Component, Input, input } from '@angular/core';
import { IMascota } from '../../interfaces/Mascota';
import { Estado } from '../../interfaces/enums';

@Component({
  selector: 'app-mascota',
  standalone: true,
  imports: [],
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.css'
})
export class MascotaComponent {
 @Input() mascota!: IMascota;
 estado = Estado;

 constructor(){}

 contactar(){
  this.mascota.estado === Estado.Encontrada ? console.log('Contactar al rescatista') : console.log('Contactar al dueño de la mascota');
 }

}
