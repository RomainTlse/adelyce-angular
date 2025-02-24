import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Article } from '../interfaces/article';
import { ArticleService } from '../services/article.service';

export const articleResolver: ResolveFn<Article[] | Article> = (
  route,
  state
) => {
  const articleService = inject(ArticleService);
  const articleId = route.paramMap.get('id');
  if (articleId) {
    return articleService.getArticleById(parseInt(articleId));
  } else {
    return articleService.getArticles();
  }
};
