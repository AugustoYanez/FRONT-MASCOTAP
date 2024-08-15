import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MascotaMiniComponent } from './mascota-mini.component';
import { UserService } from '../../services/user.service';
import { IMascota } from '../../interfaces/Mascota';
import { Estado } from '../../interfaces/enums';

describe('MascotaMiniComponent', () => {
  let component: MascotaMiniComponent;
  let fixture: ComponentFixture<MascotaMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MascotaMiniComponent], // No importes HttpClientTestingModule aquí
      providers: [provideHttpClientTesting(), UserService] // Añade provideHttpClientTesting
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotaMiniComponent);
    component = fixture.componentInstance;

    // Asigna un valor de prueba a la propiedad `mascota`
    const mockMascota: IMascota = {
      _id: '12345',
      placaID: 'ABC123',
      nombre: 'Firulais',
      apodo: 'Firu',
      estado: Estado.EnCasa,
      edad: 3,
      descripcion: 'Un perro amigable y energético.',
      imagen: 'path/to/image.jpg',
      caracteristicas: 'Pelo corto, color marrón, tamaño mediano.'
    };

    component.mascota = mockMascota;

    fixture.detectChanges(); // Detecta cambios en el componente
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
