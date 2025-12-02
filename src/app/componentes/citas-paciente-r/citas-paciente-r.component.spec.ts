import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasPacienteRComponent } from './citas-paciente-r.component';

describe('CitasPacienteRComponent', () => {
  let component: CitasPacienteRComponent;
  let fixture: ComponentFixture<CitasPacienteRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasPacienteRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasPacienteRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
