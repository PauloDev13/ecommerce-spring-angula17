import { Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { CostumerComponent } from './costumer/costumer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'costumer/dashboard',
    component: CostumerComponent,
  },
  {
    path: 'admin/dashboard',
    component: AdminComponent,
  },
];
