import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotaperdidacardComponent } from './mascotaperdidacard.component';

describe('MascotaperdidacardComponent', () => {
  let component: MascotaperdidacardComponent;
  let fixture: ComponentFixture<MascotaperdidacardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotaperdidacardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotaperdidacardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
