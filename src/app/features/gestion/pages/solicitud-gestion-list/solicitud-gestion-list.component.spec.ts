import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudGestionListComponent } from './solicitud-gestion-list.component';

describe('SolicitudGestionListComponent', () => {
  let component: SolicitudGestionListComponent;
  let fixture: ComponentFixture<SolicitudGestionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudGestionListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudGestionListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
