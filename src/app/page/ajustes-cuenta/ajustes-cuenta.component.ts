import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contacto, Documento, Rol } from '../../interfaces/enums';
import { IUsuario } from '../../interfaces/Usuario';
import { UserService } from '../../services/user.service';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ajustes-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ajustes-cuenta.component.html',
  styleUrls: ['./ajustes-cuenta.component.css']
})
export class AjustesCuentaComponent {
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

  editando: { [key: string]: boolean } = {};

  constructor(private usuarioService: UserService) {}

  ngOnInit(): void {
    this.usuarioService.perfil().subscribe((data) => {
      this.usuario = data;
    });
  }

  toggleEdicion(campo: string) {
    if (this.editando[campo]) {
      // Si estamos guardando, llama al método para actualizar el usuario
      this.editarUsuario(campo, this.usuario[campo as keyof IUsuario] as string);
    }
    // Alterna el estado de edición
    this.editando[campo] = !this.editando[campo];
  }

  editarUsuario(campo: string, valor: string) {
    if (!valor.trim()) {
      alert('El campo no puede estar vacío.');
      return;
    }
    this.usuarioService.editarUsuario({ [campo]: valor }).subscribe({
      next: (updatedUser) => {
        // Actualiza el objeto usuario directamente con los nuevos datos
        Object.assign(this.usuario, updatedUser);
      },
      error: (err) => console.error('Error al actualizar el usuario:', err),
    });
  }

  eliminarCuenta() {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {
      this.usuarioService.eliminarUsuario().subscribe({
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
