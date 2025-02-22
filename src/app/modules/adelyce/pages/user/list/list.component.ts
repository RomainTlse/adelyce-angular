import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../interfaces/user';
import { TreeTableModule } from 'primeng/treetable';
import { TableModule } from 'primeng/table';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { hugeDelete01, hugeEdit02, hugeView } from '@ng-icons/huge-icons';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-list',
  imports: [TreeTableModule, TableModule, NgIcon, Button, Card],
  templateUrl: './list.component.html',
  styleUrl: './list.component.sass',
  viewProviders: [
    provideIcons({
      hugeView,
      hugeEdit02,
      hugeDelete01,
    }),
  ],
})
export class ListComponent {
  users!: User[];
  private _router = inject(ActivatedRoute);

  ngOnInit(): void {
    this._router.data.subscribe((data) => {
      this.users = data['users'] ?? [];
    });
  }
}
