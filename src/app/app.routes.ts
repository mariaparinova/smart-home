import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { About } from './about/about';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/overview',
    pathMatch: 'full',
  },
  {
    path: 'dashboard/:id?',
    component: Dashboard,
  },
  {
    path: 'about',
    component: About,
  },

  // { path: '**', component: NotFoundComponent } todo: add error component
];
