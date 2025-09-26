import { Component, inject, OnInit, Signal } from '@angular/core';
import { ApiService } from '../../service/api-service';
import { AuthResponse } from '../../models/auth';
import { Store } from '@ngrx/store';
import * as AuthSelectors from '../../store/auth/selectors';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private _api = inject(ApiService);
  private store = inject(Store);

  user$: Signal<AuthResponse | null>;

  constructor() {
    this.user$ = this.store.selectSignal(AuthSelectors.selectUser);
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this._api.users().subscribe((res) => {
      console.log(res);
    });
  }
}
