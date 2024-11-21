import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudMascotaComponent } from './solicitud-mascota.component';

describe('SolicitudMascotaComponent', () => {
  let component: SolicitudMascotaComponent;
  let fixture: ComponentFixture<SolicitudMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudMascotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
