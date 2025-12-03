import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaNuevaPacienteRComponent } from './cita-nueva-paciente-r.component';

describe('CitaNuevaPacienteRComponent', () => {
  let component: CitaNuevaPacienteRComponent;
  let fixture: ComponentFixture<CitaNuevaPacienteRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitaNuevaPacienteRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitaNuevaPacienteRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
