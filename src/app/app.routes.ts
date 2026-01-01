import { Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';
import { CardsList } from './dashboard/components/cards-list/cards-list';
import { AuthService } from './auth/services/auth.service';
import { inject } from '@angular/core';
import { DashboardPlaceholder } from './dashboard/dashboard-placeholder';
import { DashboardDetails } from './dashboard/dashboard-details';
import { authGuard } from './auth/guards/auth-guard';
import { dashboardIndexGuard } from './dashboard/guards/dashboard-index-guard';
import { dashboardExistenceGuard } from './dashboard/guards/dashboard-existence-guard';
import { tabExistenceGuard } from './dashboard/guards/tab-existence-guard';
import {guestGuard} from './auth/guards/guest-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: () => {
      const authService = inject(AuthService);
      return authService.isAuthenticated() ? '/dashboard' : '/login';
    },
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard-layout').then((module) => module.DashboardLayout),
    title: 'Dashboard - Smart Home',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: DashboardPlaceholder,
        canActivate: [dashboardIndexGuard],
      },
      {
        path: ':dashboardId',
        component: DashboardDetails,
        canActivate: [dashboardExistenceGuard],
        children: [
          {
            path: ':tabId',
            component: CardsList,
            canActivate: [tabExistenceGuard],
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/components/login/login').then((module) => module.Login),
    title: 'Login - Smart Home',
    canActivate: [guestGuard],
  },
  { path: '**', component: NotFound },
];
