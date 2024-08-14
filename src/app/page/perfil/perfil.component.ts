import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Routes, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUsuario } from '../../interfaces/Usuario';
import { Contacto, Documento, Rol } from '../../interfaces/enums';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'] // Corrección de 'styleUrl' a 'styleUrls'
})
export class PerfilComponent implements OnInit {
  user: UserService = inject(UserService);

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

  constructor() {}

  ngOnInit(): void {
    this.user.perfil().subscribe(data => {
      this.usuario = data;
    });
  }

  verMascotas() {
    console.log('verMascotas called');
    this.user.perfil().subscribe(data => {
      console.log('Mascotas data:', data.mascotas);
      this.usuario.mascotas = data.mascotas;
    });
  }
}
