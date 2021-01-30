import { TestBed } from '@angular/core/testing';

import { EmployersService } from './employers.service';

describe('EmployersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployersService = TestBed.get(EmployersService);
    expect(service).toBeTruthy();
  });
});
