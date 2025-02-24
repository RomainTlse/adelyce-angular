import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from '../../../core/utils/services/http-request.service';
import { Basket } from '../interfaces/basket';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private apiUrl = '/api/baskets';
  private _httpRequestService = inject(HttpRequestService);

  getBaskets(): Observable<Basket[]> {
    return this._httpRequestService.getDatas<Basket[]>(this.apiUrl);
  }

  getBasketsByUser($id: number): Observable<Basket[]> {
    return this._httpRequestService.getDatas<Basket[]>(`${this.apiUrl}/${$id}`);
  }

  addBasket(basket: Basket): Observable<Basket> {
    return this._httpRequestService.postDatas<Basket>(this.apiUrl, basket);
  }
}
