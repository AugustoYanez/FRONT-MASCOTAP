import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-encontrar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './encontrar.component.html',
  styleUrl: './encontrar.component.css'
})
export class EncontrarComponent {

  constructor(private userService: UserService, private router: Router){}

  id: string = '';

  encontrarPorPlaca() {
    // Lógica para encontrar la mascota por su placa
    console.log(`Buscando mascota con placa: ${this.id}`);
    this.userService.contactarUsuario(this.id)
    // Aquí puedes agregar la lógica para buscar la mascota en tu base de datos o API
  }

  registrarMascota() {
    // Lógica para registrar una nueva mascota
    console.log('Registrando nueva mascota');
    this.router.navigate(['/mascotas/agg-mascota']);
    // Aquí puedes agregar la lógica para registrar una nueva mascota en tu base de datos o API
  }
}
