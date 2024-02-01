import { inject, Pipe, PipeTransform } from '@angular/core';

import { ProductResponseInterface } from '../../models/product-response.interface';
import { AdminService } from '../service/admin.service';

@Pipe({
  name: 'filterProduct',
  standalone: true,
})
export class FilterProductPipe implements PipeTransform {
  private adminService = inject(AdminService);

  transform(
    value: ProductResponseInterface[],
    arg: string,
  ): ProductResponseInterface[] {
    if (arg.length < 2) return value;
    return this.adminService
      .listProducts()
      .filter(el => el.name.toLowerCase().indexOf(arg.toLowerCase()) > -1);
  }
}
