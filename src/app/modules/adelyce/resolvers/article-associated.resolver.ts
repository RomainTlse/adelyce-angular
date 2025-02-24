import { ResolveFn } from '@angular/router';
import { User } from '../interfaces/user';
import { inject } from '@angular/core';
import { AuthService } from '../../../core/ui/services/auth.service';
import { BasketArticleService } from '../services/basket-article.service';
import { BasketArticle } from '../interfaces/basket-article';

export const articleAssociatedResolver: ResolveFn<BasketArticle[]> = (
  route,
  state
) => {
  const authService = inject(AuthService);
  const currentUser = JSON.parse(authService.getUser() as string)[0] as User;

  const basketArticleService = inject(BasketArticleService);
  return basketArticleService.getBasketArticleByUser(currentUser.id);
};
