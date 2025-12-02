import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesTratamientosInactivosDComponent } from './pacientes-tratamientos-inactivos-d.component';

describe('PacientesTratamientosInactivosDComponent', () => {
  let component: PacientesTratamientosInactivosDComponent;
  let fixture: ComponentFixture<PacientesTratamientosInactivosDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientesTratamientosInactivosDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientesTratamientosInactivosDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
