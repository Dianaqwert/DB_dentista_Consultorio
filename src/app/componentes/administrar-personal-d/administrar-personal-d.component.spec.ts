import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarPersonalDComponent } from './administrar-personal-d.component';

describe('AdministrarPersonalDComponent', () => {
  let component: AdministrarPersonalDComponent;
  let fixture: ComponentFixture<AdministrarPersonalDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrarPersonalDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrarPersonalDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
