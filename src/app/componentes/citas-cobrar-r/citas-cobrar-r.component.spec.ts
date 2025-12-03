import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasCobrarRComponent } from './citas-cobrar-r.component';

describe('CitasCobrarRComponent', () => {
  let component: CitasCobrarRComponent;
  let fixture: ComponentFixture<CitasCobrarRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasCobrarRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasCobrarRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
