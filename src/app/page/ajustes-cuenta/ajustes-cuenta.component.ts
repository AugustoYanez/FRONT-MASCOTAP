import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Contacto, Documento, Rol } from '../../interfaces/enums';
import { IUsuario } from '../../interfaces/Usuario';
import { UserService } from '../../services/user.service';
import { IMascota } from '../../interfaces/Mascota';
import { inject } from '@angular/core';
@Component({
  selector: 'app-ajustes-cuenta',
  standalone: true,
  imports: [],
  templateUrl: './ajustes-cuenta.component.html',
  styleUrl: './ajustes-cuenta.component.css'
})
export class AjustesCuentaComponent {
  user: UserService = inject(UserService)

  usuario: IUsuario = {
    nombre: '',
    apellido: '',
    email: '',
    contrasena: '',
    nroDocumento: '',
    documento: Documento.Cuil,
    contacto: Contacto.Email,
    rol: Rol.Usuario,
    telefono: '',
    mascotas: []  
  };


  constructor(private usuarioService: UserService) { }  

  ngOnInit(): void {
    this.usuarioService.perfil().subscribe(data => {
        this.usuario = data; 
    });
}


}
