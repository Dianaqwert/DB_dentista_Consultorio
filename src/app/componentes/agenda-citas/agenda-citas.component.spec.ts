import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaCitasComponent } from './agenda-citas.component';

describe('AgendaCitasComponent', () => {
  let component: AgendaCitasComponent;
  let fixture: ComponentFixture<AgendaCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaCitasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
