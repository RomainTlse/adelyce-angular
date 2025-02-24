import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { BasketArticle } from '../interfaces/basket-article';
import { BasketArticleService } from '../services/basket-article.service';

export const basketArticleResolver: ResolveFn<BasketArticle[]> = (
  route,
  state
) => {
  const basketArticleService = inject(BasketArticleService);

  return basketArticleService.getBasketArticle();
};
