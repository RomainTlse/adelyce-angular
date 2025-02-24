import { Basket } from './basket';
import { Article } from './article';

export interface BasketArticle {
  article: Article;
  basket: Basket;
  quantity: number;
}
