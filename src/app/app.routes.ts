import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/ui/pages/page-not-found/page-not-found.component';
import { PageUnauthorizedComponent } from './core/ui/pages/page-unauthorized/page-unauthorized.component';
import { NotificationComponent } from './core/ui/pages/notification/notification.component';

export const routes: Routes = [
  {
    path: 'notification',
    component: NotificationComponent,
  },
  {
    path: 'page-unauthorized',
    component: PageUnauthorizedComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];
