import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificarMascotaComponent } from './notificar-mascota.component';

describe('NotificarMascotaComponent', () => {
  let component: NotificarMascotaComponent;
  let fixture: ComponentFixture<NotificarMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificarMascotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificarMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
