import { TestBed } from '@angular/core/testing';

import { BasketArticleService } from './basket-article.service';

describe('BasketArticleService', () => {
  let service: BasketArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasketArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
