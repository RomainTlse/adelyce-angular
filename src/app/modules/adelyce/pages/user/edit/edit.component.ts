import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-edit',
  imports: [],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.sass',
})
export class EditComponent {
  user?: User;

  constructor(
    private _userService: UserService,
    private _router: ActivatedRoute
  ) {
    const userId = this._router.snapshot.paramMap.get('id');
    if (userId) {
      this._router.data.subscribe((data) => {
        this.user = data['user']; // Les utilisateurs résolus par le resolver
      });
    }
  }
}
