import { TestBed } from '@angular/core/testing';

import { StockMaterialService } from './stock-material.service';

describe('StockMaterialService', () => {
  let service: StockMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
