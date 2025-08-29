import { Component, signal } from '@angular/core';
import { Registration } from './components/registration/registration';
import { Login } from './components/login/login';

@Component({
  selector: 'app-root',
  imports: [Registration, Login],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
