import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudGestionDetailComponent } from './solicitud-gestion-detail.component';

describe('SolicitudGestionDetailComponent', () => {
  let component: SolicitudGestionDetailComponent;
  let fixture: ComponentFixture<SolicitudGestionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudGestionDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudGestionDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
