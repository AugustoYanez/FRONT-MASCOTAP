import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotaModalComponent } from './mascota-modal.component';

describe('MascotaModalComponent', () => {
  let component: MascotaModalComponent;
  let fixture: ComponentFixture<MascotaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotaModalComponent]
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
