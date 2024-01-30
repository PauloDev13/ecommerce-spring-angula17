import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { take, tap } from 'rxjs';

import { CategoryRequestInterface } from '../../models/category-request.interface';
import { CategoryResponseInterface } from '../../models/category-response.interface';
import { ProductResponseInterface } from '../../models/product-response.interface';
import { UserStorageService } from '../../services/user-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  listProducts = signal<ProductResponseInterface[]>([]);
  listFilter = signal<ProductResponseInterface[]>([]);
  private readonly BASE_URL: string = 'http://localhost:8080';
  private readonly http = inject(HttpClient);
  // SEARCH ALL PRODUCTS
  private allProducts$ = this.http
    .get<ProductResponseInterface[]>(`${this.BASE_URL}/api/admin/products`, {
      headers: this.authorizationHeader(),
    })
    .pipe(
      take(1),
      tap(res => {
        this.listProducts.set(res);
        this.listFilter.set(res);
      }),
    )
    .subscribe();

  // SIGNAL GET ALL PRODUCTS
  // products = toSignal(this.allProducts$, {
  //   initialValue: [] as ProductResponseInterface[],
  // });
  // SEARCH ALL CATEGORIES
  private allCategories$ = this.http.get<CategoryResponseInterface[]>(
    `${this.BASE_URL}/api/admin/categories`,
    {
      headers: this.authorizationHeader(),
    },
  );
  // SIGNAL GET ALL CATEGORIES
  categories = toSignal(this.allCategories$, {
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
          this.listProducts.update(res => [...res, productResp]);
        }),
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
