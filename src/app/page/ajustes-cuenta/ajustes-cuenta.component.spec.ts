import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesCuentaComponent } from './ajustes-cuenta.component';
import { provideHttpClient } from '@angular/common/http';
describe('AjustesCuentaComponent', () => {
  let component: AjustesCuentaComponent;
  let fixture: ComponentFixture<AjustesCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient()],
      imports: [AjustesCuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjustesCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
