import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MascotaModalComponent } from './mascota-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule
import { provideHttpClientTesting } from '@angular/common/http/testing'; // Asegúrate de importar provideHttpClientTesting

describe('MascotaModalComponent', () => {
  let component: MascotaModalComponent;
  let fixture: ComponentFixture<MascotaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotaModalComponent, HttpClientTestingModule], // Asegúrate de importar HttpClientTestingModule
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }, // Mock data for the dialog
        { provide: MatDialogRef, useValue: {} }, // Mock dialog reference
        provideHttpClientTesting() // Proporciona HttpClientTesting
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
