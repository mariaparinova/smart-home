import { Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';
import { CardsList } from './dashboard/components/cards-list/cards-list';
import { DashboardPlaceholder } from './dashboard/dashboard-placeholder';
import { DashboardDetails } from './dashboard/dashboard-details';
import { authGuard } from './auth/guards/auth-guard';
import { guestGuard } from './auth/guards/guest-guard';
import { inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

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
      },
      {
        path: ':dashboardId',
        component: DashboardDetails,
        children: [
          {
            path: ':tabId',
            component: CardsList,
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
