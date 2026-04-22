import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotaDetail } from './mascota-detail.component';

describe('MascotaDetail', () => {
  let component: MascotaDetail;
  let fixture: ComponentFixture<MascotaDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotaDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(MascotaDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
