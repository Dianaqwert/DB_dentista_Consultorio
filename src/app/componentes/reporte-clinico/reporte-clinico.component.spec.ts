import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteClinicoComponent } from './reporte-clinico.component';

describe('ReporteClinicoComponent', () => {
  let component: ReporteClinicoComponent;
  let fixture: ComponentFixture<ReporteClinicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteClinicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteClinicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
