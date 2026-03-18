import { TestBed } from '@angular/core/testing';

import { Dragonball } from './dragonball';

describe('Dragonball', () => {
  let service: Dragonball;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dragonball);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
