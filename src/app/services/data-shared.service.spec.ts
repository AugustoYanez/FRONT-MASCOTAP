import { TestBed } from '@angular/core/testing';

import { DataSharedService } from './data-shared.service';

describe('DataSharedService', () => {
  let service: DataSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
