import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const userResolver: ResolveFn<Observable<User | User[]>> = (
  route: ActivatedRouteSnapshot
) => {
  const userId = route.paramMap.get('id'); // Récupère l'ID de l'URL
  const userService = inject(UserService);

  if (userId) {
    // Si un ID est présent dans l'URL, retourne un utilisateur spécifique
    console.log(userId);
    return userService.getUserById(parseInt(userId));
  } else {
    // Sinon, retourne tous les utilisateurs
    return userService.getUsers();
  }
};
