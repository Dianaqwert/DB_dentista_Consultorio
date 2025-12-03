import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionpacientesRComponent } from './direccionpacientes-r.component';

describe('DireccionpacientesRComponent', () => {
  let component: DireccionpacientesRComponent;
  let fixture: ComponentFixture<DireccionpacientesRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DireccionpacientesRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DireccionpacientesRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
