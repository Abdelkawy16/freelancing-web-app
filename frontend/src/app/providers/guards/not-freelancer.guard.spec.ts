import { TestBed } from '@angular/core/testing';

import { NotFreelancerGuard } from './not-freelancer.guard';

describe('NotFreelancerGuard', () => {
  let guard: NotFreelancerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotFreelancerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
