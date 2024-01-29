import { AsyncPipe, NgForOf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import {
  MatFormField,
  MatLabel,
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
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private adminService = inject(AdminService);
  protected products = this.adminService.listProducts;
  protected products2 = this.adminService.listProducts2;
  private formBuilder = inject(FormBuilder);

  protected filterName: string = '';
  protected searchFormProduct = this.formBuilder.group({
    title: [''],
  });

  onSubmit() {
    const { title } = this.searchFormProduct.getRawValue();
    const resultProducts: ProductResponseInterface[] = [];

    for (const product of this.products()) {
      if (product.name.toLowerCase().indexOf(title!.toLowerCase()) > -1) {
        resultProducts.push(product);
      }
    }

    if (title !== '') {
      this.products.update(() => [...resultProducts]);
    } else {
      console.log('PASSOU');
      this.products.update(() => [...this.products2()]);
    }
    //
    //   if (title) {
    //     this.adminService
    //       .allProductsByName$(title)
    //       .pipe(tap(res => this.products.update(() => [...res])))
    //       .subscribe();
    //
    //     this.searchFormProduct.reset();
    //   }
  }
  //
  // onReset() {
  //   this.products.set(this.products2());
  //   console.log(this.products2());
  // }
}
