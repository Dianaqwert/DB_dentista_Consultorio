import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasCobroRComponent } from './citas-cobro-r.component';

describe('CitasCobroRComponent', () => {
  let component: CitasCobroRComponent;
  let fixture: ComponentFixture<CitasCobroRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasCobroRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasCobroRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
