import { TestBed } from '@angular/core/testing';

import { ClientsDataService } from './clients-data.service';

describe('ClientsDataService', () => {
  let service: ClientsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
