import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedapacientesRComponent } from './busquedapacientes-r.component';

describe('BusquedapacientesRComponent', () => {
  let component: BusquedapacientesRComponent;
  let fixture: ComponentFixture<BusquedapacientesRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusquedapacientesRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedapacientesRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
