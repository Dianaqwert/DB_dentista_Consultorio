import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobrosEingresosRComponent } from './cobros-eingresos-r.component';

describe('CobrosEingresosRComponent', () => {
  let component: CobrosEingresosRComponent;
  let fixture: ComponentFixture<CobrosEingresosRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CobrosEingresosRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CobrosEingresosRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
