import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoPacienteDComponent } from './tratamiento-paciente-d.component';

describe('TratamientoPacienteDComponent', () => {
  let component: TratamientoPacienteDComponent;
  let fixture: ComponentFixture<TratamientoPacienteDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TratamientoPacienteDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TratamientoPacienteDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
