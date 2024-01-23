import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { SignupRequestInterface } from '../models/signup-request.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatInput,
    MatInputModule,
    MatIconButton,
    MatSuffix,
    MatIcon,
    MatButton,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  protected formBuilder = inject(FormBuilder);
  protected snackBar = inject(MatSnackBar);
  protected authService = inject(AuthService);
  protected router = inject(Router);

  protected signupForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });
  protected hidePassword: boolean = true;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.verifyPassword()) {
      this.snackBar.open('Passwords do not match.', 'close', {
        duration: 5000,
        panelClass: 'error-snackbar',
      });
      return;
    }
    if (this.signupForm.valid) {
      const request: SignupRequestInterface = {
        email: this.signupForm.value.email!,
        name: this.signupForm.value.name!,
        password: this.signupForm.value.password!,
      };

      this.authService
        .register$(request)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.snackBar.open('Sign up successfully', 'close', {
              duration: 3000,
              panelClass: 'success-snackbar',
            });

            this.router.navigate(['/login']).then();
          },
          error: () =>
            this.snackBar.open('Error add user', 'close', {
              duration: 3000,
              panelClass: 'error-snackbar',
            }),
        });
    }
  }

  private verifyPassword() {
    return (
      this.signupForm.controls.password.value! !==
      this.signupForm.controls.confirmPassword.value!
    );
  }
}
