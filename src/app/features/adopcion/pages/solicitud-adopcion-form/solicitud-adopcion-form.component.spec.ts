import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudAdopcionFormComponent } from './solicitud-adopcion-form.component';

describe('SolicitudAdopcionFormComponent', () => {
  let component: SolicitudAdopcionFormComponent;
  let fixture: ComponentFixture<SolicitudAdopcionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudAdopcionFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudAdopcionFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
