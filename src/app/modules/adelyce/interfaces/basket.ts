import { User } from './user';
import { BasketArticle } from './basket-article';

export interface Basket {
  id?: number;
  basket_number: string;
  dt_created: Date;
  user: User;
  basketArticles?: BasketArticle[];
}
