import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasGestionarRComponent } from './citas-gestionar-r.component';

describe('CitasGestionarRComponent', () => {
  let component: CitasGestionarRComponent;
  let fixture: ComponentFixture<CitasGestionarRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasGestionarRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasGestionarRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
