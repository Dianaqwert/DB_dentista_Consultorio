import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPacientesDComponent } from './historial-pacientes-d.component';

describe('HistorialPacientesDComponent', () => {
  let component: HistorialPacientesDComponent;
  let fixture: ComponentFixture<HistorialPacientesDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialPacientesDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialPacientesDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
