import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteGananciasRComponent } from './reporte-ganancias-r.component';

describe('ReporteGananciasRComponent', () => {
  let component: ReporteGananciasRComponent;
  let fixture: ComponentFixture<ReporteGananciasRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteGananciasRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteGananciasRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
