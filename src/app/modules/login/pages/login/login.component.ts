import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Card } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/ui/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [Card, FloatLabel, InputText, Password, Button, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  errorMessage?: string;
  private _fb = inject(FormBuilder);
  loginForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  private _authService = inject(AuthService);
  private _router = inject(Router);

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (email && password) {
        this._authService.login(email, password).subscribe({
          next: (data) => {
            this._router.navigate(['/']);
          },
          error: (err) => {
            this.errorMessage = err.error;
          },
        });
      }
    }
  }
}
