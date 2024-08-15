import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { EditarMascotaModalComponent } from './editar-mascota-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('EditarMascotaModalComponent', () => {
  let component: EditarMascotaModalComponent;
  let fixture: ComponentFixture<EditarMascotaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarMascotaModalComponent],
      providers: [
        provideHttpClient(),
        { provide: MAT_DIALOG_DATA, useValue: {} }, // Proporciona un valor vacío o un mock para MAT_DIALOG_DATA
        { provide: MatDialogRef, useValue: {} }, // Proporciona un mock para MatDialogRef
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarMascotaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
