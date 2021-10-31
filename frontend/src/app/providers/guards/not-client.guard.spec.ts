import { TestBed } from '@angular/core/testing';

import { NotClientGuard } from './not-client.guard';

describe('NotClientGuard', () => {
  let guard: NotClientGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotClientGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
