import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Basket } from '../interfaces/basket';
import { BasketService } from '../services/basket.service';
import { User } from '../interfaces/user';
import { AuthService } from '../../../core/ui/services/auth.service';

export const basketResolver: ResolveFn<Basket[]> = (route, state) => {
  const basketService = inject(BasketService);
  const authService = inject(AuthService);
  const currentUser = JSON.parse(authService.getUser() as string) as User[];
  if (currentUser) {
    return basketService.getBasketsByUser(currentUser[0].id);
  } else {
    return basketService.getBaskets();
  }
};
