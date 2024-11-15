import { Component } from '@angular/core';
import { tipoDato } from '../../interfaces/enums';
import { Router } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { ICaracteristicas } from '../../interfaces/Caracteristica';

@Component({
  selector: 'app-caracteristicas',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './caracteristicas.component.html',
  styleUrl: './caracteristicas.component.css'
})
export class CaracteristicasComponent {

 constructor(private router:  Router){}

 formulario(){
  this.router.navigate(['/admin/form-caracteristicas'])
 }
 
 displayedColumns: string[] = ['nombre', 'tipo de dato'];
 dataSource: ICaracteristicas[] = [
  {
    nombre: "gfd",
    tipoDato: tipoDato.string
  }
 ];
}
