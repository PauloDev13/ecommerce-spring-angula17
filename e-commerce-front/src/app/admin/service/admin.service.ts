import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryRequestInterface } from '../../models/category-request.interface';
import { CategoryResponseInterface } from '../../models/category-response.interface';
import { UserStorageService } from '../../services/user-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly BASE_URL: string = 'http://localhost:8080';
  private readonly http = inject(HttpClient);

  createCategory$(
    category: CategoryRequestInterface,
  ): Observable<CategoryResponseInterface> {
    return this.http.post<CategoryResponseInterface>(
      `${this.BASE_URL}/api/admin/category`,
      category,
      { headers: this.authorizationHeader() },
    );
  }

  private authorizationHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${UserStorageService.getToken()}`,
    });
  }
}
