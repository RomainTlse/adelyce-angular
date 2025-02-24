import { Component, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ActivatedRoute } from '@angular/router';
import { Basket } from '../../interfaces/basket';
import { BasketArticle } from '../../interfaces/basket-article';
import { AuthService } from '../../../../core/ui/services/auth.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { hugeDelete01, hugeEdit02, hugeView } from '@ng-icons/huge-icons';
import { BasketArticleService } from '../../services/basket-article.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [Button, Card, TableModule, NgIcon, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
  viewProviders: [
    provideIcons({
      hugeView,
      hugeEdit02,
      hugeDelete01,
    }),
  ],
})
export class HomeComponent {
  currentUser: User | null = null;
  basket!: Basket;
  basketArticles!: BasketArticle[];
  private _router = inject(ActivatedRoute);
  private _authService = inject(AuthService);
  private _basketArticleService = inject(BasketArticleService);

  ngOnInit() {
    this._router.data.subscribe((data) => {
      this.basket = data['basket'][0] ?? [];
      this.basketArticles = data['associatedArticle'] ?? [];
    });

    this.currentUser = JSON.parse(
      this._authService.getUser() as string
    )[0] as User;
  }

  deleteArticle(id: number) {
    if (this.basket.id) {
      this._basketArticleService
        .deleteArticle(this.basket.id, id)
        .subscribe((data) => {
          if (this.basket.basketArticles) {
            this.basket.basketArticles = this.basket.basketArticles.filter(
              (item) => item.article.id !== id
            );
          }
        });
    }
  }
}
