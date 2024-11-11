import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotaPerdidaCardComponent } from './mascotaperdidacard.component';

describe('MascotaperdidacardComponent', () => {
  let component: MascotaPerdidaCardComponent;
  let fixture: ComponentFixture<MascotaPerdidaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotaPerdidaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotaPerdidaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
