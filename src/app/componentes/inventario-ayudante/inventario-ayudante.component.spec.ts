import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioAyudanteComponent } from './inventario-ayudante.component';

describe('InventarioAyudanteComponent', () => {
  let component: InventarioAyudanteComponent;
  let fixture: ComponentFixture<InventarioAyudanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioAyudanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioAyudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
