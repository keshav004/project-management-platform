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
        path: 'forgot-password',

        loadComponent: () =>
            import('./features/auth/forgot-password/forgot-password')
                .then(m => m.ForgotPassword)

    },
    {
        path: 'reset-password',

        loadComponent: () =>
            import('./features/auth/reset-password/reset-password')
                .then(m => m.ResetPassword)

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
