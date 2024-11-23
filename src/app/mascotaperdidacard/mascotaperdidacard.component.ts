import { Component, Input } from '@angular/core';
import { IMascota } from '../interfaces/Mascota';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-mascota-perdida-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './mascotaperdidacard.component.html',
  styleUrls: ['./mascotaperdidacard.component.css']
})
export class MascotaPerdidaCardComponent {
  @Input() mascota!: IMascota;

  constructor(private userService: UserService) {}

  encontreMascota() {
    console.log(`Se encontró la mascota con ID: ${this.mascota._id}`);
    // Implementa la lógica que necesites aquí
  }

  contactarDuenio() {
    console.log(`Contactar al dueño de la mascota con ID: ${this.mascota._id}`);
    // Implementa la lógica que necesites aquí
  }
}
