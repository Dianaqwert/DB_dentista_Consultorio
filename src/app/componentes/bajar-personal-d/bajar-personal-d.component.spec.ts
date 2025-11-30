import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajarPersonalDComponent } from './bajar-personal-d.component';

describe('BajarPersonalDComponent', () => {
  let component: BajarPersonalDComponent;
  let fixture: ComponentFixture<BajarPersonalDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BajarPersonalDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BajarPersonalDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
