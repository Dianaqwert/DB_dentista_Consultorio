import { TestBed } from '@angular/core/testing';

import { TipoMaterialService } from './material.service';

describe('TipoMaterialService', () => {
  let service: TipoMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
