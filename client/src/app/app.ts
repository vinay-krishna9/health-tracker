import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Registration } from './components/registration/registration';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Registration],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
