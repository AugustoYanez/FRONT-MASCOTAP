import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EditarMascotaModalComponent } from '../editar-mascota-modal/editar-mascota-modal.component';
import { DataSharedService } from '../../services/data-shared.service';
import { MascotaService } from '../../services/mascota.service';
@Component({
  selector: 'app-mascota-modal',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './mascota-modal.component.html',
  styleUrl: './mascota-modal.component.css'
})
export class MascotaModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private mascotaService: MascotaService, private dialogRef: MatDialogRef<MascotaModalComponent>, private router: Router, public dialog: MatDialog, private sharedData: DataSharedService) { }

  eliminarMascota() {
    this.mascotaService.eliminarMascota(this.data._id).subscribe(
      () => {
        this.sharedData.removeData(this.data._id)
        this.dialogRef.close(this.data._id);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        alert('Error al eliminar la mascota');
      }
    );
  }
  editarMascota() {
    const dialogRef = this.dialog.open(EditarMascotaModalComponent, {
      width: '400px',
      data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.data = result;
      this.sharedData.changeData(result._id, result);
      this.mascotaService.editarMascota(result).subscribe();
    })
  }
}
