import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAyudanteComponent } from './menu-ayudante.component';

describe('MenuAyudanteComponent', () => {
  let component: MenuAyudanteComponent;
  let fixture: ComponentFixture<MenuAyudanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuAyudanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuAyudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
