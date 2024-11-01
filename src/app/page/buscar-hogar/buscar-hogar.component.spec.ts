import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarHogarComponent } from './buscar-hogar.component';

describe('BuscarHogarComponent', () => {
  let component: BuscarHogarComponent;
  let fixture: ComponentFixture<BuscarHogarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarHogarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarHogarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
