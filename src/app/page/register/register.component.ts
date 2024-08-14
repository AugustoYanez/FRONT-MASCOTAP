import { Component, inject } from '@angular/core';
import { Contacto, Documento, Rol } from '../../interfaces/enums';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { IUsuario } from '../../interfaces/Usuario';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  usuario: IUsuario;
  enumDoc: typeof Documento = Documento;
  enumCon: typeof Contacto = Contacto;
  auth: AuthService = inject(AuthService);

  mensajeExito: string | null = null;
  mensajeError: string[] | null = null;

  constructor(private Router: Router){
    this.usuario = {
    nombre: '',
    apellido: '',
    email: '',
    contrasena: '',
    nroDocumento: '',
    documento: Documento.Cuil,
    contacto: Contacto.Email,
    rol: Rol.Usuario,
    telefono: '',
    mascotas: [] = []
  };
  }

  getEnumValues(enumType: any): string[] {
    return Object.keys(enumType).map(key => enumType[key]);
  }

  validarCampos(): string[] {
    const errores: string[] = [];
    if (!this.usuario.nombre || !this.usuario.apellido || !this.usuario.email || !this.usuario.contrasena || !this.usuario.nroDocumento || !this.usuario.telefono){
      errores.push("Los campos estan vacios. ")
    }
    return errores;
  }

  guardarUsuario(evento: Event){
    evento.preventDefault();
    
    const errores = this.validarCampos();
    if (errores.length > 0) {
      this.mensajeError = errores;
      this.mensajeExito = null;
      return;
    }

    this.auth.register(this.usuario).subscribe({
      next: (res) => {
        // Manejar respuesta exitosa
        this.mensajeExito = res.message;
        this.mensajeError = null;
        localStorage.setItem('token', res.token);
        if (res.admin) {
          localStorage.setItem('admin', res.admin);
        }
        this.Router.navigate(['/']);
      },
      error: (err) => {
        // Manejar error
        this.mensajeExito = null;
        this.mensajeError = err.error;
      }
    })
  }
}

