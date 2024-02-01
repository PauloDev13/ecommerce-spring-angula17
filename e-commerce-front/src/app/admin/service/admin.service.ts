import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, tap } from 'rxjs';

import { CategoryRequestInterface } from '../../models/category-request.interface';
import { CategoryResponseInterface } from '../../models/category-response.interface';
import { ProductResponseInterface } from '../../models/product-response.interface';
import { UserStorageService } from '../../services/user-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  listProducts = signal<ProductResponseInterface[]>([]);
  listCategories = signal<CategoryResponseInterface[]>([]);
  private readonly BASE_URL: string = 'http://localhost:8080';
  private readonly http = inject(HttpClient);

  // GET ALL PRODUCTS
  private allProducts$ = this.http
    .get<ProductResponseInterface[]>(`${this.BASE_URL}/api/admin/products`, {
      headers: this.authorizationHeader(),
    })
    .pipe(
      tap(res => {
        this.listProducts.set(res);
      }),
      catchError(err => {
        console.log('Error find products', err.error);
        return EMPTY;
      }),
    );

  readOnlyAllProducts = toSignal(this.allProducts$, {
    initialValue: [] as ProductResponseInterface[],
  });

  // SEARCH ALL CATEGORIES
  private allCategories$ = this.http
    .get<CategoryResponseInterface[]>(`${this.BASE_URL}/api/admin/categories`, {
      headers: this.authorizationHeader(),
    })
    .pipe(
      catchError(err => {
        console.log('Error find categories', err.error);
        return EMPTY;
      }),
    );
  // SIGNAL GET ALL CATEGORIES
  readOnlyCategories = toSignal(this.allCategories$, {
    initialValue: [] as CategoryResponseInterface[],
  });

  // CREATE ONE CATEGORY
  createCategory$(category: CategoryRequestInterface) {
    return this.http.post<CategoryResponseInterface>(
      `${this.BASE_URL}/api/admin/category`,
      category,
      { headers: this.authorizationHeader() },
    );
  }

  // CREATE ONE PRODUCT
  createProduct$(product: FormData) {
    return this.http.post<ProductResponseInterface>(
      `${this.BASE_URL}/api/admin/product`,
      product,
      {
        headers: this.authorizationHeader(),
      },
    );
  }

  // SEARCH ALL PRODUCTS BY NAME
  allProductsByName$ = (name: string) =>
    this.http.get<ProductResponseInterface[]>(
      `${this.BASE_URL}/api/admin/search/${name}`,
      {
        headers: this.authorizationHeader(),
      },
    );

  // ADD TOKEN IN HEADER AUTHORIZATION
  private authorizationHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${UserStorageService.getToken()}`,
    });
  }
}
