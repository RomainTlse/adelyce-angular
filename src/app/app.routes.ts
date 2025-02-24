import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/ui/pages/page-not-found/page-not-found.component';
import { PageUnauthorizedComponent } from './core/ui/pages/page-unauthorized/page-unauthorized.component';
import { ListComponent } from './modules/adelyce/pages/user/list/list.component';
import { ViewComponent } from './modules/adelyce/pages/user/view/view.component';
import { userResolver } from './modules/adelyce/resolvers/user.resolver';
import { authGuard } from './core/utils/guards/auth.guard';
import { LoginComponent } from './modules/login/pages/login/login.component';
import { SignUpComponent } from './modules/login/pages/sign-up/sign-up.component';
import { HomeComponent } from './modules/adelyce/pages/home/home.component';
import { EditComponent } from './modules/adelyce/pages/basket/edit/edit.component';
import { EditComponent as EditComponentArticle } from './modules/adelyce/pages/article/edit/edit.component';
import { basketResolver } from './modules/adelyce/resolvers/basket.resolver';
import { basketArticleResolver } from './modules/adelyce/resolvers/basket-article.resolver';
import { articleResolver } from './modules/adelyce/resolvers/article.resolver';
import { articleAssociatedResolver } from './modules/adelyce/resolvers/article-associated.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      basket: basketResolver,
      associatedArticle: articleAssociatedResolver,
    },
    canActivate: [authGuard],
  },
  {
    path: 'baskets/edit',
    component: EditComponent,
    resolve: {
      articles: articleResolver,
    },
    canActivate: [authGuard],
  },
  {
    path: 'articles/edit/:id',
    component: EditComponentArticle,
    resolve: {
      basketArticle: basketArticleResolver,
    },
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: SignUpComponent,
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        component: ListComponent,
        resolve: { users: userResolver },
        canActivate: [authGuard],
      },
      {
        path: 'list',
        component: ListComponent,
        resolve: { users: userResolver },
        canActivate: [authGuard],
      },
      {
        path: 'edit/:id',
        component: EditComponent,
        resolve: { user: userResolver },
        canActivate: [authGuard],
      },
      {
        path: 'view/:id',
        component: ViewComponent,
        resolve: { user: userResolver },
        canActivate: [authGuard],
      },
    ],
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
