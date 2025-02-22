import { Component, inject } from '@angular/core';
import { User } from '../../../interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view',
  imports: [Card, Button],
  templateUrl: './view.component.html',
  styleUrl: './view.component.sass',
})
export class ViewComponent {
  user?: User;
  private _router = inject(ActivatedRoute);
  private httpClient = inject(HttpClient);

  constructor() {
    this._router.data.subscribe((data) => {
      this.user = data['user'];
    });
  }
}
