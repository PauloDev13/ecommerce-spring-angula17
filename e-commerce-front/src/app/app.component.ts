import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { UserStorageService } from './services/user-storage.service';

const MATERIAL = [MatToolbarModule, MatButtonModule];

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, MATERIAL],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ECommerce Angular';
  private router = inject(Router);
  private userStorageService = inject(UserStorageService);
  protected userLoggedIn = this.userStorageService.userLoggedIn;

  logout() {
    this.userStorageService.signOut();
    this.router.navigate(['login']).then();
  }
}
