import { Routes } from '@angular/router';
import { Registration } from './components/registration/registration';
import { Login } from './components/login/login';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'registration', component: Registration },
  { path: 'login', component: Login },
  { path: 'home', component: Home },
];
