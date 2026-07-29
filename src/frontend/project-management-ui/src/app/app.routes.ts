import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
    {
    path: 'login',
    loadComponent: () =>
    import('./features/auth/login/login')
        .then(m => m.Login)
    },
    {
    path: 'register',
    loadComponent: () =>
    import('./features/auth/register/register')
        .then(m => m.Register)
    },
    {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard')
            .then(m => m.Dashboard)
      }
      ]
    },

    {
    path: '**',
    redirectTo: 'login'
    } 
];
