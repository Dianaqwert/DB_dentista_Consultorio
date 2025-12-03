import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesMainComponentComponent } from './pacientes-main-component.component';

describe('PacientesMainComponentComponent', () => {
  let component: PacientesMainComponentComponent;
  let fixture: ComponentFixture<PacientesMainComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientesMainComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientesMainComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
