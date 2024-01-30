import { AsyncPipe, NgForOf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import {
  MatFormField,
  MatLabel,
  MatPrefix,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';

import { ProductResponseInterface } from '../../../models/product-response.interface';
import { FilterProductPipe } from '../../pipes/filter-product.pipe';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCard,
    MatDivider,
    NgForOf,
    MatButton,
    RouterLink,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSuffix,
    MatIcon,
    FormsModule,
    FilterProductPipe,
    AsyncPipe,
    MatPrefix,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private adminService = inject(AdminService);
  protected products = this.adminService.listProducts;
  protected productsFilter = this.adminService.listFilter;

  onSearch(text: string) {
    this.products.update(() => this.productsFilter());
    const resultProducts: ProductResponseInterface[] = [];

    if (text.length > 2) {
      for (const product of this.products()) {
        if (product.name.toLowerCase().indexOf(text.toLowerCase()) > -1) {
          resultProducts.push(product);
        }
      }
      this.products.update(() => resultProducts);
    }
  }
}
