import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DerivacionesExtPacienteDComponent } from './derivaciones-ext-paciente-d.component';

describe('DerivacionesExtPacienteDComponent', () => {
  let component: DerivacionesExtPacienteDComponent;
  let fixture: ComponentFixture<DerivacionesExtPacienteDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DerivacionesExtPacienteDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DerivacionesExtPacienteDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
