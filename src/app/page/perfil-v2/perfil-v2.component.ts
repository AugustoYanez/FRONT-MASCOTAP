import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUsuario } from '../../interfaces/Usuario';
import { ActivatedRoute } from '@angular/router';
import { Contacto, Documento, Rol } from '../../interfaces/enums';

@Component({
  selector: 'app-perfil-v2',
  standalone: true,
  imports: [],
  templateUrl: './perfil-v2.component.html',
  styleUrl: './perfil-v2.component.css'
})
export class PerfilV2Component {
  usuario : IUsuario = {
    apellido: '',
    nombre: "",
    email: "",
    contacto: Contacto.Sms,
    telefono: "",
    contrasena: "",
    documento: Documento.Cuil,
    mascotas: [],
    nroDocumento: "",
    rol: Rol.Usuario,
  };
  constructor(private userService : UserService, private route: ActivatedRoute){
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchUser(id);
      }
    });
    
  }

  fetchUser(id: string) {
    this.userService.getPerfil(id).subscribe(data => {
      this.usuario = data;
      console.log(this.usuario);
    });
  }

}
