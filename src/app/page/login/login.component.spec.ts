import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PerfilComponent } from '../perfil/perfil.component';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs'; // Importa 'of' para simular observables

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilComponent], // Asegúrate de que el componente se importe aquí
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute, 
          useValue: { snapshot: { paramMap: {} } } // Mock básico para ActivatedRoute
        },
        {
          provide: UserService, 
          useValue: {
            perfil: () => of({ // Simula el método 'perfil' del UserService
              nombre: 'John',
              apellido: 'Doe',
              email: 'john.doe@example.com',
              contrasena: 'password',
              nroDocumento: '12345678',
              documento: 'Cuil',
              contacto: 'Email',
              rol: 'Usuario',
              telefono: '123456789',
              mascotas: []
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
