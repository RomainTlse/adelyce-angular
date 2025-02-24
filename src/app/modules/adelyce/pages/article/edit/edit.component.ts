import { Component, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketArticle } from '../../../interfaces/basket-article';
import { Button } from 'primeng/button';
import { BasketArticleService } from '../../../services/basket-article.service';
import { TranslatePipe } from '@ngx-translate/core';
import { User } from '../../../interfaces/user';
import { AuthService } from '../../../../../core/ui/services/auth.service';

@Component({
  selector: 'app-edit',
  imports: [
    Card,
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    Button,
    TranslatePipe,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.sass',
})
export class EditComponent {
  basketArticle!: BasketArticle;
  private _fb = inject(FormBuilder);
  articleUpdateForm = this._fb.group({
    quantity: new FormControl<number>(0),
  });
  private _activateRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _basketArticleService = inject(BasketArticleService);
  private _authService = inject(AuthService);

  ngOnInit() {
    // const articleId = this._activateRouteSnapshot.paramMap.get('id');
    this._activateRoute.params.subscribe((params) => {
      const articleId = params['id'];
      const currentUser = JSON.parse(
        this._authService.getUser() as string
      )[0] as User;
      this._activateRoute.data.subscribe((data) => {
        if (articleId) {
          this.basketArticle = data['basketArticle'].filter(
            (item: BasketArticle) =>
              item.basket.user?.id === currentUser.id &&
              item.article.id === parseInt(articleId)
          )[0];
        }
        this.articleUpdateForm = this._fb.group({
          quantity: new FormControl(this.basketArticle.quantity),
        });
      });
    });
  }

  updateArticle(): void {
    if (this.articleUpdateForm.valid) {
      const { quantity } = this.articleUpdateForm.value;
      if (quantity) {
        const dataToUpdate = {
          basket: this.basketArticle.basket,
          article: this.basketArticle.article,
          quantity,
        };

        this._basketArticleService
          .updateBasketArticle(dataToUpdate)
          .subscribe(() => {
            this._router.navigate(['/']);
          });
      }
    }
  }
}
