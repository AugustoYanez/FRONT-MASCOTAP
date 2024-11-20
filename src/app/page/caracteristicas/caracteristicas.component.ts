import { Component, inject, OnInit } from '@angular/core';
import { tipoDato } from '../../interfaces/enums';
import { Router } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { ICaracteristicas } from '../../interfaces/Caracteristica';
import { CaracteristicasService } from '../../services/caracteristicas.service';

@Component({
  selector: 'app-caracteristicas',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './caracteristicas.component.html',
  styleUrl: './caracteristicas.component.css'
})
export class CaracteristicasComponent implements OnInit{
  service: CaracteristicasService = inject(CaracteristicasService)
  displayedColumns: string[] = ['nombre', 'tipo de dato'];
  dataSource: ICaracteristicas[] = [];
 constructor(private router:  Router){}

  ngOnInit(): void {
    this.service.getCaracteristicas().subscribe((data) => {
      this.dataSource = data
    })
  }

 formulario(){
  this.router.navigate(['/admin/form-caracteristicas'])
 }
 
}
