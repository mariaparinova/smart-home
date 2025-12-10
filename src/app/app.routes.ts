import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { About } from './about/about';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'about',
    component: About,
  },

  // { path: '**', component: NotFoundComponent } todo: add error component
];
