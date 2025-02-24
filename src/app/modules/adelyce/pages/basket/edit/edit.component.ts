import { Component, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../../interfaces/article';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';
import { Button } from 'primeng/button';
import { ArticleService } from '../../../services/article.service';
import { Select } from 'primeng/select';
import { BasketService } from '../../../services/basket.service';
import { AuthService } from '../../../../../core/ui/services/auth.service';
import { BasketArticleService } from '../../../services/basket-article.service';
import { Basket } from '../../../interfaces/basket';
import { NotificationService } from '../../../../../core/ui/services/notification.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-edit',
  imports: [
    Card,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabel,
    InputText,
    Button,
    Select,
    TranslatePipe,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.sass',
})
export class EditComponent {
  articles!: Article[];
  users!: User[];
  protected authService = inject(AuthService);
  private _fb = inject(FormBuilder);
  articleForm = this._fb.group({
    article: new FormControl<Article | null>(null),
  });
  articleNewForm = this._fb.group({
    name: [''],
    quantity: [''],
  });
  associatedUserForm = this._fb.group({
    associated_user: new FormControl<User | undefined | null>(null),
  });
  private _articleService = inject(ArticleService);
  private _activateRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _userService = inject(UserService);
  private _basketService = inject(BasketService);
  private _basketArticleService = inject(BasketArticleService);
  private _notificationService = inject(NotificationService);
  private _authService = inject(AuthService);

  ngOnInit() {
    this._activateRoute.data.subscribe((data) => {
      this.articles = data['articles'] ?? [];
    });
    this._userService.getUsers().subscribe((data) => {
      this.users = data ?? [];
      const currentUser = JSON.parse(
        this._authService.getUser() as string
      )[0] as User;

      return this.users.filter((user) => user.id !== currentUser.id);
    });
  }

  newBasket(): void {
    const currentUser = JSON.parse(
      this.authService.getUser() as string
    ) as User[];

    if (this.articleForm.valid) {
      const { article } = this.articleForm.value;
      const { associated_user } = this.associatedUserForm.value;
      if (article) {
        this._basketService
          .getBasketsByUser(currentUser[0].id)
          .subscribe((data) => {
            if (data.length > 0) {
              this._basketArticleService
                .addBasketArticle(data[0], article, associated_user)
                .subscribe(() => {
                  this._router.navigate(['/']);
                });
              if (associated_user) {
                this._notificationService
                  .addNotification({
                    title: 'Nouvelle association',
                    description:
                      'Un utilisateur a associé un produit avec vous',
                    dt_created: new Date(),
                  })
                  .subscribe();
              }
            } else {
              const basket: Basket = {
                basket_number: Math.floor(
                  Math.random() * (100 - 1) + 1
                ).toString(),
                dt_created: new Date(),
                user: currentUser[0],
              };
              const newBasket = this._basketService.addBasket(basket);
              newBasket.subscribe((data) => {
                this._basketArticleService.addBasketArticle(
                  data,
                  article,
                  associated_user
                );
              });
              if (associated_user) {
                this._notificationService
                  .addNotification({
                    title: 'Nouvelle association',
                    description:
                      'Un utilisateur a associé un produit avec vous',
                    dt_created: new Date(),
                  })
                  .subscribe();
              }
            }
          });
      }
    }
    if (this.articleNewForm.valid) {
      const { name, quantity } = this.articleNewForm.value;
      const { associated_user } = this.associatedUserForm.value;
      let newArticle: Article;
      if (name && quantity) {
        const result = this._articleService.addArticle({
          name,
          quantity: parseInt(quantity),
        });
        if (result) {
          result.subscribe((data) => {
            newArticle = data;
            this._basketService
              .getBasketsByUser(currentUser[0].id)
              .subscribe((data) => {
                if (data.length > 0) {
                  this._basketArticleService
                    .addBasketArticle(data[0], newArticle, associated_user)
                    .subscribe(() => {
                      this._router.navigate(['/']);
                    });
                  if (associated_user) {
                    this._notificationService
                      .addNotification({
                        title: 'Nouvelle association',
                        description:
                          'Un utilisateur a associé un produit avec vous',
                        dt_created: new Date(),
                      })
                      .subscribe();
                  }
                } else {
                  const basket: Basket = {
                    basket_number: Math.floor(
                      Math.random() * (100 - 1) + 1
                    ).toString(),
                    dt_created: new Date(),
                    user: currentUser[0],
                  };
                  const newBasket = this._basketService.addBasket(basket);
                  newBasket.subscribe((data) => {
                    this._basketArticleService
                      .addBasketArticle(data, newArticle, associated_user)
                      .subscribe();
                  });
                  if (associated_user) {
                    this._notificationService
                      .addNotification({
                        title: 'Nouvelle association',
                        description:
                          'Un utilisateur a associé un produit avec vous',
                        dt_created: new Date(),
                      })
                      .subscribe();
                  }
                }
              });
          });
        }
      }
    }
  }
}
