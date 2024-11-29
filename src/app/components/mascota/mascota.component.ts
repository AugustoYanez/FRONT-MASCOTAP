import { Component, Input, OnInit, input } from '@angular/core';
import { IMascota } from '../../interfaces/Mascota';
import { Estado } from '../../interfaces/enums';
import { UserService } from '../../services/user.service';
import { MascotaService } from '../../services/mascota.service';

@Component({
  selector: 'app-mascota',
  standalone: true,
  imports: [],
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.css'
})
export class MascotaComponent implements OnInit {
 @Input() mascota!: IMascota;
 estado = Estado;
 idUser: string = "";

 constructor(private userService: UserService, private mascotaService: MascotaService){
    
 }
  ngOnInit(): void {
    this.mascotaService.encontrarDueño(this.mascota._id).subscribe(data => {
      this.idUser = data;
    }) 
  } 

 contactar(){
  
  this.mascota.estado === Estado.Encontrada ? this.userService.contactarUsuario(this.idUser) : this.userService.contactarUsuario(this.idUser);
  }

}
