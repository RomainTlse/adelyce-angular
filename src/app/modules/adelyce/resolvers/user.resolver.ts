import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const userResolver: ResolveFn<Observable<User | User[]>> = (
  route: ActivatedRouteSnapshot
) => {
  const userId = route.paramMap.get('id');
  const userService = inject(UserService);

  if (userId) {
    return userService.getUserById(parseInt(userId));
  } else {
    // Sinon, retourne tous les utilisateurs
    return userService.getUsers();
  }
};
