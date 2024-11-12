import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: 'dashboard',
    title: 'Dashboart',
    loadComponent: () => import('./dashboard/dashboard.component')
},
{
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./login/login.component')
},
{
    path: 'register',
    title: 'Register',
    loadComponent: () => import('./register/register.component')
},
{
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
}];
