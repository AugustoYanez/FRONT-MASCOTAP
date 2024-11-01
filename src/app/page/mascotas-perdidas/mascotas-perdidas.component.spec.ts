import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasPerdidasComponent } from './mascotas-perdidas.component';

describe('MascotasPerdidasComponent', () => {
  let component: MascotasPerdidasComponent;
  let fixture: ComponentFixture<MascotasPerdidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotasPerdidasComponent]
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
