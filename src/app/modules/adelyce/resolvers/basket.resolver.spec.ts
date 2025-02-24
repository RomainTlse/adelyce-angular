import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { basketResolver } from './basket.resolver';

describe('basketResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => basketResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
