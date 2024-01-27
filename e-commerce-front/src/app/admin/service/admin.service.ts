import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

import { CategoryRequestInterface } from '../../models/category-request.interface';
import { CategoryResponseInterface } from '../../models/category-response.interface';
import { ProductResponseInterface } from '../../models/product-response.interface';
import { UserStorageService } from '../../services/user-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly BASE_URL: string = 'http://localhost:8080';
  private readonly http = inject(HttpClient);

  // SEARCH PRODUCTS
  private allProducts$ = this.http.get<ProductResponseInterface[]>(
    `${this.BASE_URL}/api/admin/products`,
    {
      headers: this.authorizationHeader(),
    },
  );

  products = toSignal(this.allProducts$, {
    initialValue: [],
  });

  // SEARCH CATEGORIES
  private allCategories$ = this.http.get<CategoryResponseInterface[]>(
    `${this.BASE_URL}/api/admin/categories`,
    {
      headers: this.authorizationHeader(),
    },
  );

  categories = toSignal(this.allCategories$, {
    initialValue: [],
  });

  // CREATE CATEGORY
  createCategory$(category: CategoryRequestInterface) {
    return this.http.post<CategoryResponseInterface>(
      `${this.BASE_URL}/api/admin/category`,
      category,
      { headers: this.authorizationHeader() },
    );
  }

  // CREATE CATEGORY
  createProduct$(product: FormData) {
    return this.http
      .post<ProductResponseInterface>(
        `${this.BASE_URL}/api/admin/product`,
        product,
        {
          headers: this.authorizationHeader(),
        },
      )
      .pipe(
        tap(productResp => {
          this.products().push(productResp);
        }),
      );
  }

  // ADD TOKEN IN HEADER AUTHORIZATION
  private authorizationHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${UserStorageService.getToken()}`,
    });
  }
}
