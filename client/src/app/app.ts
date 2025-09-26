import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth/actions';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private store = inject(Store);

  ngOnInit(): void {
    console.log('App component initialized, loading stored auth...');
    this.store.dispatch(AuthActions.loadStoredAuth());
  }
}
