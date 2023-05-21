// app.routes.ts

import { Routes } from '@angular/router';
export const APP_ROUTES: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./home/home.routes').then(m => m.HOME_ROTUES)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
];