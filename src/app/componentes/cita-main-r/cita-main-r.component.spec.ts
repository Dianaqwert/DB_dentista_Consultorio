import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaMainRComponent } from './cita-main-r.component';

describe('CitaMainRComponent', () => {
  let component: CitaMainRComponent;
  let fixture: ComponentFixture<CitaMainRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitaMainRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitaMainRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
