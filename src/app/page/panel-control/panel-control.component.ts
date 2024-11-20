import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-control',
  standalone: true,
  imports: [],
  templateUrl: './panel-control.component.html',
  styleUrl: './panel-control.component.css'
})
export class PanelControlComponent {
  constructor(private router: Router){

  }
  caracteristicas(){
    this.router.navigate(['/admin/caracteristicas'])
  }
  solicitudes(){
    
  }
}
