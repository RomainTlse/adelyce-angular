import { inject, Injectable } from '@angular/core';
import { HttpRequestService } from '../../../core/utils/services/http-request.service';
import { Observable } from 'rxjs';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = '/api/articles';
  private _httpRequestService = inject(HttpRequestService);

  getArticles(): Observable<Article[]> {
    return this._httpRequestService.getDatas<Article[]>(this.apiUrl);
  }

  getArticleById(id: number): Observable<Article> {
    return this._httpRequestService.getById<Article>(`this.apiUrl/${id}`);
  }

  addArticle(article: Article): Observable<Article> {
    return this._httpRequestService.postDatas<Article>(this.apiUrl, article);
  }
}
