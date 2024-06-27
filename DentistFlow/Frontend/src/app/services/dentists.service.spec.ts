import { TestBed } from '@angular/core/testing';

import { DentistsService } from './dentists.service';

describe('DentistsService', () => {
  let service: DentistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DentistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
