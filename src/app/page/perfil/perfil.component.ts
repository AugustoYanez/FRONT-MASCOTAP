import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Routes, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUsuario } from '../../interfaces/Usuario';
import { Contacto, Documento, Rol } from '../../interfaces/enums';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'] // Corrección de 'styleUrl' a 'styleUrls'
})
export class PerfilComponent implements OnInit {
  private router = inject(Router);
  private user: UserService = inject(UserService);
  private auth: AuthService = inject(AuthService);

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

  constructor(private usuarioService: UserService) {}

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
  eliminarCuenta() {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {
      this.user.eliminarUsuario().subscribe({
        next: () => {
          alert('Cuenta eliminada con éxito');
          this.auth.logout();
          this.router.navigate(['/login']);
        },
        error: (err) => console.error(err),
      });
    }
  }
}
