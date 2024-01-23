import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { UserStorageInterface } from '../models/user-storage.interface';

const TOKEN = 'ecom-token';
const USER = 'ecom-user';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  BASE_URL = 'http://localhost:8080';
  userLoggedIn = signal('');

  protected readonly http = inject(HttpClient);

  static getToken(): string {
    return localStorage.getItem(TOKEN)!;
  }

  static getUser(): UserStorageInterface {
    const userStorage: UserStorageInterface = JSON.parse(
      localStorage.getItem(USER)!,
    );
    return userStorage;
  }

  static getUserId(): number | null {
    if (!this.getUser()) {
      return null;
    }
    return this.getUser().userId;
  }

  static getUserRole(): string | null {
    if (!this.getUser()) {
      return null;
    }
    return this.getUser().role;
  }

  static isAdminLogged(): boolean {
    if (!this.getToken()) {
      return false;
    }
    const role: string = this.getUserRole()!;
    return role === 'ADMIN';
  }

  static isCostumerLogged(): boolean {
    if (!this.getToken()) {
      return false;
    }
    const role: string = this.getUserRole()!;
    return role === 'COSTUMER';
  }

  static signOut() {
    if (localStorage) {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(USER);
    }
  }

  public saveToken(token: string): void {
    if (localStorage) {
      localStorage.removeItem(TOKEN);
      localStorage.setItem(TOKEN, token);
    }
  }

  public saveUser(user: NonNullable<unknown>): void {
    if (localStorage) {
      localStorage.removeItem(USER);
      localStorage.setItem(USER, JSON.stringify(user));
    }
  }
}
