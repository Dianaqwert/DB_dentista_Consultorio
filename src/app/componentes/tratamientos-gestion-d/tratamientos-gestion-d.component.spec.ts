import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientosGestionDComponent } from './tratamientos-gestion-d.component';

describe('TratamientosGestionDComponent', () => {
  let component: TratamientosGestionDComponent;
  let fixture: ComponentFixture<TratamientosGestionDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TratamientosGestionDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TratamientosGestionDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
