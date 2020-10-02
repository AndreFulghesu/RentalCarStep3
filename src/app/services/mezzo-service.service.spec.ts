import { TestBed } from '@angular/core/testing';

import { MezzoServiceService } from './mezzo-service.service';

describe('MezzoServiceService', () => {
  let service: MezzoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MezzoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
