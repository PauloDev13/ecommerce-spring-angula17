import { Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CostumerComponent } from './costumer.component';

export const COSTUMER_ROUTES: Routes = [
  {
    path: '',
    component: CostumerComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];
