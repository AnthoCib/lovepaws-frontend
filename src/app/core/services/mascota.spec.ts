import { TestBed } from '@angular/core/testing';

import { Mascota } from './mascota.service';

describe('Mascota', () => {
  let service: Mascota;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mascota);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
