import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/public/not-found/not-found.component';
import { MainComponent } from './components/pages/main.component';
import { LoginComponent } from './components/public/login/login.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        loadChildren: './components/pages/page.module#PageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {Title: 'Autenticación de admin'}
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];


export const APP_ROUTES = RouterModule.forRoot(routes, {useHash: true});
