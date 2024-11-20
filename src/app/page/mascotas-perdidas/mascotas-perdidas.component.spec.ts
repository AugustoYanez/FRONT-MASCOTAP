import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MascotasPerdidasComponent } from './mascotas-perdidas.component';  // Importa el componente standalone
import { provideHttpClient } from '@angular/common/http';

describe('MascotasPerdidasComponent', () => {
  let component: MascotasPerdidasComponent;
  let fixture: ComponentFixture<MascotasPerdidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MascotasPerdidasComponent,  // IMPORTAR el componente standalone aquí
        HttpClientTestingModule     // Agregar el módulo de pruebas de HttpClient
      ],
      providers: [provideHttpClient()]  // Proporciona HttpClient
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotasPerdidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
