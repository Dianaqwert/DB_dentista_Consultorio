import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioDComponent } from './inventario-d.component';

describe('InventarioDComponent', () => {
  let component: InventarioDComponent;
  let fixture: ComponentFixture<InventarioDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
