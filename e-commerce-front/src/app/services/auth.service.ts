import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { LoginRequest } from '../models/login-request.interface';
import { SignupRequestInterface } from '../models/signup-request.interface';
import { SignupResponseInterface } from '../models/signup-response.interface';
import { UserStorageService } from './user-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL = 'http://localhost:8080';

  protected readonly http = inject(HttpClient);
  protected userStorageService = inject(UserStorageService);

  register(request: SignupRequestInterface) {
    return this.http.post<SignupResponseInterface>(
      `${this.BASE_URL}/sign-up`,
      request,
    );
  }

  public login(request: LoginRequest): Observable<boolean> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .post(`${this.BASE_URL}/authenticate`, request, {
        headers,
        observe: 'response',
      })
      .pipe(
        map(res => {
          const token = res.headers.get('authorization')?.substring(7);
          const user = res.body;
          console.log('TOKEN ', res.headers.get('authorization')?.substring(7));
          console.log('BODY ', res);

          if (token && user) {
            this.userStorageService.saveToken(token);
            this.userStorageService.saveUser(user);
            return true;
          }
          return false;
        }),
      );
  }
}
