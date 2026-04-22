import { TestBed } from '@angular/core/testing';

import { Adopcion } from './adopcion.service';

describe('Adopcion', () => {
  let service: Adopcion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Adopcion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
