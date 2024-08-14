import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotaMiniComponent } from './mascota-mini.component';

describe('MascotaMiniComponent', () => {
  let component: MascotaMiniComponent;
  let fixture: ComponentFixture<MascotaMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotaMiniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotaMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
