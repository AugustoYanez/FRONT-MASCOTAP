import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AgregarMascotaComponent } from './agregar-mascota.component';

describe('AgregarMascotaComponent', () => {
  let component: AgregarMascotaComponent;
  let fixture: ComponentFixture<AgregarMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarMascotaComponent],
      providers: [provideHttpClient(), AgregarMascotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
