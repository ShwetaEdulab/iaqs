import { TestBed, inject } from '@angular/core/testing';

import { SupportapiService } from './supportapi.service';

describe('SupportapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupportapiService]
    });
  });

  it('should be created', inject([SupportapiService], (service: SupportapiService) => {
    expect(service).toBeTruthy();
  }));
});
