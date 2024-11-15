import { Component } from '@angular/core';
import { ICaracteristicas } from '../../interfaces/Caracteristica';
import { tipoDato } from '../../interfaces/enums';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-caracteristicas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-caracteristicas.component.html',
  styleUrl: './form-caracteristicas.component.css'
})
export class FormCaracteristicasComponent {
  
 tipoDato: typeof tipoDato = tipoDato;
 caracteristica: ICaracteristicas = {
   nombre: "",
   tipoDato: tipoDato.string
 };

 getEnumValues(enumType: any): string[] {
  return Object.keys(enumType).map(key => enumType[key]);
}

 guardarCaracteristica(event: Event){}
}
