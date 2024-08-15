import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { DataSharedService } from './data-shared.service';

describe('DataSharedService', () => {
  let service: DataSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), DataSharedService]
    });
    service = TestBed.inject(DataSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
