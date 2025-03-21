import { Component, inject, ViewChild } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { NotificationComponent } from '../popovers/notification/notification.component';
import { Popover } from 'primeng/popover';
import { UserComponent } from '../popovers/user/user.component';
import { ThemeService } from '../../services/theme.service';
import { Icon } from '../../../../app.component';
import {
  Language,
  LanguageService,
} from '../../../utils/services/language.service';
import { Badge } from 'primeng/badge';
import { hugeMail02 } from '@ng-icons/huge-icons';
import { Store } from '@ngxs/store';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [NgIcon, NotificationComponent, Popover, UserComponent, Badge],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
  viewProviders: [
    provideIcons({
      hugeMail02,
    }),
  ],
})
export class HeaderComponent {
  @ViewChild('popoverNotification') popoverNotification!: Popover;
  @ViewChild('popoverUser') popoverUser!: Popover;

  public themeService = inject(ThemeService);
  icon: Icon = 'hugeSun02';
  selectedLang: Language = 'fr';
  languageLogo = 'images/france.png';
  notificationCount = 0;
  protected languageService = inject(LanguageService);
  protected store = inject(Store);
  protected translate = inject(TranslateService);

  constructor() {
    this.themeService.getTheme().subscribe((isDark) => {
      this.icon = isDark ? 'hugeSun02' : 'hugeMoon02'; // Change l'icône selon le thème
    });

    this.languageService.getLanguage().subscribe((lang) => {
      this.selectedLang = lang;
      this.languageLogo =
        lang === 'fr' ? 'images/royaume-uni.png' : 'images/france.png';
    });

    this.store
      .select((state) => state.notifications.notificationCount)
      .subscribe((count) => (this.notificationCount = count ?? 0));
  }

  toggleNotification(event: MouseEvent) {
    this.popoverNotification.toggle(event);
  }

  toggleUser(event: MouseEvent) {
    this.popoverUser.toggle(event);
  }
}
