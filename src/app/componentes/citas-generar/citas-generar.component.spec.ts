import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasGenerarComponent } from './citas-generar.component';

describe('CitasGenerarComponent', () => {
  let component: CitasGenerarComponent;
  let fixture: ComponentFixture<CitasGenerarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasGenerarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasGenerarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
