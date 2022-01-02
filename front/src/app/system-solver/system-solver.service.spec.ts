import { TestBed } from '@angular/core/testing';

import { SystemSolverService } from './system-solver.service';

describe('SystemSolverService', () => {
  let service: SystemSolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemSolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
