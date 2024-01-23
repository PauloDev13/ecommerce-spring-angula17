import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardTitle,
  MatCardTitleGroup,
} from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';

import { LoginRequest } from '../models/login-request.interface';
import { AuthService } from '../services/auth.service';
import { UserStorageService } from '../services/user-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardTitleGroup,
    MatCardContent,
    MatFormField,
    MatIcon,
    MatInput,
    MatInputModule,
    ReactiveFormsModule,
    MatCardTitle,
    MatCardActions,
    RouterLink,
    MatIconButton,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  protected formBuilder = inject(FormBuilder);
  protected snackBar = inject(MatSnackBar);
  protected userStorageService = inject(UserStorageService);
  protected authService = inject(AuthService);
  protected router = inject(Router);

  protected loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  protected hidePassword: boolean = true;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const request: LoginRequest = {
        username: this.loginForm.controls.email.value!,
        password: this.loginForm.controls.password.value!,
      };

      this.authService
        .login(request)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.userStorageService.userLoggedIn.set(
              UserStorageService.getUserRole()!,
            );

            if (this.userStorageService.userLoggedIn() === 'ADMIN') {
              this.router.navigate(['admin/dasboard']).then();
            } else {
              this.router.navigate(['costumer/dashboard']).then();
            }
            this.snackBar.open('Sign up successfully', 'close', {
              duration: 3000,
              panelClass: 'success-snackbar',
            });
          },
          error: () =>
            this.snackBar.open(`Bad credentials`, 'close', {
              duration: 3000,
              panelClass: 'error-snackbar',
            }),
        });
    }
  }
}
