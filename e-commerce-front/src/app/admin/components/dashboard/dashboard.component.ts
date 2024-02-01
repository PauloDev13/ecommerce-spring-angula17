import { AsyncPipe, NgForOf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  protected filterName = '';
  private adminService = inject(AdminService);
  protected products = this.adminService.listProducts;
}
