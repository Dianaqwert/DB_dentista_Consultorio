import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientosDComponent } from './tratamientos-d.component';

describe('TratamientosDComponent', () => {
  let component: TratamientosDComponent;
  let fixture: ComponentFixture<TratamientosDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TratamientosDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TratamientosDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
