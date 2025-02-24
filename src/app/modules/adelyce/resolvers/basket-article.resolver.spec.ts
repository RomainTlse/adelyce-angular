import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { basketArticleResolver } from './basket-article.resolver';

describe('basketArticleResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => basketArticleResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
