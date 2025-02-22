import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/ui/pages/page-not-found/page-not-found.component';
import { PageUnauthorizedComponent } from './core/ui/pages/page-unauthorized/page-unauthorized.component';
import { NotificationComponent } from './core/ui/pages/notification/notification.component';
import { ListComponent } from './modules/adelyce/pages/user/list/list.component';
import { EditComponent } from './modules/adelyce/pages/user/edit/edit.component';
import { ViewComponent } from './modules/adelyce/pages/user/view/view.component';
import { userResolver } from './modules/adelyce/resolvers/user.resolver';

export const routes: Routes = [
  {
    path: 'users',
    children: [
      { path: '', component: ListComponent, resolve: { users: userResolver } },
      {
        path: 'list',
        component: ListComponent,
        resolve: { users: userResolver },
      },
      {
        path: 'edit/:id',
        component: EditComponent,
        resolve: { user: userResolver },
      },
      {
        path: 'view/:id',
        component: ViewComponent,
        resolve: { user: userResolver },
      },
    ],
  },
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
