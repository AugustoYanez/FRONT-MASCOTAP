import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-encontrar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './encontrar.component.html',
  styleUrl: './encontrar.component.css'
})
export class EncontrarComponent {

  constructor(){}

  placa: string = '';

  encontrarPorPlaca() {
    // Lógica para encontrar la mascota por su placa
    console.log(`Buscando mascota con placa: ${this.placa}`);
    // Aquí puedes agregar la lógica para buscar la mascota en tu base de datos o API
  }

  registrarMascota() {
    // Lógica para registrar una nueva mascota
    console.log('Registrando nueva mascota');
    // Aquí puedes agregar la lógica para registrar una nueva mascota en tu base de datos o API
  }
}
