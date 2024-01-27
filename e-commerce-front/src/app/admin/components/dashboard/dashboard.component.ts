import { NgForOf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';

import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCard, MatDivider, NgForOf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private adminService = inject(AdminService);
  protected readonly products = this.adminService.products;
}
