import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../../modules/adelyce/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiUrlLogin = '/api/login';
  private _apiUrlRegister = '/api/register';
  private currentUserSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> =
    this.currentUserSubject.asObservable();
  private _httpClient = inject(HttpClient);
  private _router = inject(Router);

  // Récupère l'utilisateur actuel (après la connexion, depuis le token)
  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this._httpClient
      .post<any>(this._apiUrlLogin, { email, password })
      .pipe(
        tap((user) => {
          if (user) {
            this.saveUser(JSON.stringify(user));

            // Mettre à jour le currentUser
            this.setCurrentUser(user);
          }
        })
      );
  }

  register(
    email: string,
    password: string,
    username: string,
    firstname: string,
    lastname: string
  ): Observable<any> {
    return this._httpClient.post<any>(this._apiUrlRegister, {
      email,
      password,
      username,
      firstname,
      lastname,
    });
  }

  saveUser(token: string): void {
    localStorage.setItem('currentUser', token);
  }

  getUser(): string | null {
    return localStorage.getItem('currentUser');
  }

  // Fonction pour déconnecter l'utilisateur
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this._router.navigate(['/login']);
  }

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return !!this.getUser(); // Si un token est présent, l'utilisateur est authentifié
  }

  // Récupère et met à jour le currentUser à partir du token stocké
  private setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }
}
