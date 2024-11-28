import { Component, Input, input } from '@angular/core';
import { IMascota } from '../../interfaces/Mascota';
import { Estado } from '../../interfaces/enums';
import { UserService } from '../../services/user.service';

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

 constructor(private userService: UserService){}

 contactar(){
  this.mascota.estado === Estado.Encontrada ? this.userService.contactarUsuario("543f") : this.userService.contactarUsuario("543f");
 }

}
