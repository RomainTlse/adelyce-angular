import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../ui/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Injection du service d'authentification
  const router = inject(Router); // Injection du router pour rediriger

  // Vérifie si l'utilisateur est connecté en vérifiant le token
  if (authService.getUser()) {
    return true;
  } else {
    // Si pas de token, redirige vers la page de login
    router.navigate(['/login']);
    return false;
  }
};
