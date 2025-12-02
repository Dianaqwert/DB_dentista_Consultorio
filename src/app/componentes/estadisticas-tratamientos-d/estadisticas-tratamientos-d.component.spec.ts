import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasTratamientosDComponent } from './estadisticas-tratamientos-d.component';

describe('EstadisticasTratamientosDComponent', () => {
  let component: EstadisticasTratamientosDComponent;
  let fixture: ComponentFixture<EstadisticasTratamientosDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticasTratamientosDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticasTratamientosDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
