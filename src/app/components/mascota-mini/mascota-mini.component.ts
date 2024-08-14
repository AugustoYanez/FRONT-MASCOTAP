import { Component, Input, OnInit } from '@angular/core';
import { IMascota } from '../../interfaces/Mascota';
import { MascotaModalComponent } from '../mascota-modal/mascota-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DataSharedService } from '../../services/data-shared.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-mascota-mini',
  standalone: true,
  imports: [],
  templateUrl: './mascota-mini.component.html',
  styleUrl: './mascota-mini.component.css'
})
export class MascotaMiniComponent {
  @Input() mascota!: IMascota;

  constructor(public dialog: MatDialog) {
  }

  openDetails() {
    this.dialog.open(MascotaModalComponent, {
      data: this.mascota
    });
  }
}