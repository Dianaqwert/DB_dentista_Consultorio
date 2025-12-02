import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPacienteRComponent } from './alta-paciente-r.component';

describe('AltaPacienteRComponent', () => {
  let component: AltaPacienteRComponent;
  let fixture: ComponentFixture<AltaPacienteRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaPacienteRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaPacienteRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
