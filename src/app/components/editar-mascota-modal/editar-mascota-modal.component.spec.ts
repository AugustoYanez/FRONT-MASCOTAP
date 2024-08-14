import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMascotaModalComponent } from './editar-mascota-modal.component';

describe('EditarMascotaModalComponent', () => {
  let component: EditarMascotaModalComponent;
  let fixture: ComponentFixture<EditarMascotaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarMascotaModalComponent]
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
