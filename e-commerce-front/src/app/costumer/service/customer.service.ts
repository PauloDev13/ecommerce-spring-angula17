import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, tap } from 'rxjs';

import { AddCartRequest } from '../../models/add-cart-request.interface';
import { AddCartResponse } from '../../models/add-cart-response.interface';
import { ProductResponseInterface } from '../../models/product-response.interface';
import { UserStorageService } from '../../services/user-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  listProducts = signal<ProductResponseInterface[]>([]);
  private readonly BASE_URL: string = 'http://localhost:8080';
  private readonly http = inject(HttpClient);

  // GET ALL PRODUCTS
  private allProducts$ = this.http
    .get<ProductResponseInterface[]>(`${this.BASE_URL}/api/costumer/products`)
    .pipe(
      tap(productsRes => {
        this.listProducts.set(productsRes);
      }),
      catchError(err => {
        console.log('Error find products', err.error);
        return EMPTY;
      }),
    );
  // SIGNAL GET ALL PRODUCTS
  readOnlyAllProducts = toSignal(this.allProducts$, {
    initialValue: [] as ProductResponseInterface[],
  });

  addToCart(productId: string | number) {
    const cartRequest: AddCartRequest = {
      userId: UserStorageService.getUserId(),
      productId,
    };

    return this.http.post<AddCartResponse>(
      `${this.BASE_URL}/api/customer/cart`,
      cartRequest,
    );
  }
}
