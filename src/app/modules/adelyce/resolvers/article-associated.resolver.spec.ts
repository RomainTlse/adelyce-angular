import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { articleAssociatedResolver } from './article-associated.resolver';

describe('articleAssociatedResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => articleAssociatedResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
