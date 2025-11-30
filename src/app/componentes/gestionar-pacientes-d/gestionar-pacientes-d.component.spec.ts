import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarPacientesDComponent } from './gestionar-pacientes-d.component';

describe('GestionarPacientesDComponent', () => {
  let component: GestionarPacientesDComponent;
  let fixture: ComponentFixture<GestionarPacientesDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarPacientesDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarPacientesDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
