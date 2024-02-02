import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, tap } from 'rxjs';

import { ProductResponseInterface } from '../../models/product-response.interface';

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
}
