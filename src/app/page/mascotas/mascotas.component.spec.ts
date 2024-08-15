import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { MascotasComponent } from './mascotas.component';
import { of } from 'rxjs';
import { ComponentFixture } from '@angular/core/testing';
describe('MascotasComponent', () => {
  let component: MascotasComponent;
  let fixture: ComponentFixture<MascotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotasComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: {} } }  // Provee un valor vacío o simulado para ActivatedRoute
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
