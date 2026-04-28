import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorFormComponent } from './gestor-form.component';

describe('GestorFormComponent', () => {
  let component: GestorFormComponent;
  let fixture: ComponentFixture<GestorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestorFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GestorFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
