import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDentistaComponent } from './menu-dentista.component';

describe('MenuDentistaComponent', () => {
  let component: MenuDentistaComponent;
  let fixture: ComponentFixture<MenuDentistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDentistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDentistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
