import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioEditComponent } from './usuario-edit.component';

describe('UsuarioEditComponent', () => {
  let component: UsuarioEditComponent;
  let fixture: ComponentFixture<UsuarioEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioEditComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
