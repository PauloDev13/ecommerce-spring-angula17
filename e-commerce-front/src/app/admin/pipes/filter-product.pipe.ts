import { Pipe, PipeTransform } from '@angular/core';

import { ProductResponseInterface } from '../../models/product-response.interface';

@Pipe({
  name: 'filterProduct',
  standalone: true,
})
export class FilterProductPipe implements PipeTransform {
  transform(
    value: ProductResponseInterface[],
    arg: string,
  ): ProductResponseInterface[] {
    if (arg === '' || arg.length < 2) return value;

    const resultProducts: ProductResponseInterface[] = [];
    for (const product of value) {
      if (product.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultProducts.push(product);
      }
    }
    return resultProducts;
  }
}
