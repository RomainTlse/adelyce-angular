import { Component, inject } from '@angular/core';
import { Badge } from 'primeng/badge';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  hugeLogout03,
  hugeMail02,
  hugeSetting07,
  hugeUser,
} from '@ng-icons/huge-icons';
import { User } from '../../../../../modules/adelyce/interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user',
  imports: [Badge, NgIcon, TranslatePipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.sass',
  viewProviders: [
    provideIcons({
      hugeUser,
      hugeSetting07,
      hugeMail02,
      hugeLogout03,
    }),
  ],
})
export class UserComponent {
  currentUser: User | null = null;
  protected authService = inject(AuthService);

  ngOnInit() {
    this.currentUser = JSON.parse(
      this.authService.getUser() as string
    )[0] as User;
  }

  logout(): void {
    this.authService.logout();
  }
}
