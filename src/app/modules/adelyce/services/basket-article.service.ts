import { inject, Injectable } from '@angular/core';
import { HttpRequestService } from '../../../core/utils/services/http-request.service';
import { Observable } from 'rxjs';
import { BasketArticle } from '../interfaces/basket-article';
import { Basket } from '../interfaces/basket';
import { Article } from '../interfaces/article';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class BasketArticleService {
  private apiUrl = '/api/basketarticle';
  private apiUrlAssociated = '/api/associated';
  private _httpRequestService = inject(HttpRequestService);

  getBasketArticle(): Observable<BasketArticle[]> {
    return this._httpRequestService.getDatas<BasketArticle[]>(this.apiUrl);
  }

  getBasketArticleById(
    basketId: number,
    articleId: number
  ): Observable<BasketArticle[]> {
    return this._httpRequestService.getById<BasketArticle[]>(
      `${this.apiUrl}/${basketId}/${articleId}`
    );
  }

  getBasketArticleByUser($id: number): Observable<BasketArticle[]> {
    return this._httpRequestService.getDatas<BasketArticle[]>(
      `${this.apiUrlAssociated}/${$id}`
    );
  }

  addBasketArticle(
    basket: Basket,
    article: Article,
    associated_user?: User | null
  ): Observable<BasketArticle> {
    const data = {
      basket,
      article,
      quantity: 1,
      associated_user,
    };
    return this._httpRequestService.postDatas<BasketArticle>(
      this.apiUrl + '/add',
      data
    );
  }

  updateBasketArticle(data: BasketArticle): Observable<BasketArticle> {
    return this._httpRequestService.updateDatas<BasketArticle>(
      `${this.apiUrl}/${data.basket.id}/${data.article.id}`,
      data
    );
  }

  deleteArticle(idBasket: number, idArticle: number) {
    return this._httpRequestService.deleteDatas(
      `${this.apiUrl}/${idBasket}/${idArticle}`
    );
  }
}
