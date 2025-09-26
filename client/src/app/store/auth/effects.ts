import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as AuthActions from './actions';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.authService.login(action.credentials).pipe(
          map((response) =>
            AuthActions.loginSuccess({
              name: response.name,
              email: response.email,
              token: response.token,
            })
          ),
          catchError((error) =>
            of(
              AuthActions.loginFailure({
                error: error.message || 'Login failed',
              })
            )
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ name, email, token }) => {
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_data', JSON.stringify({ name, email }));
          this.router.navigate(['home']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }),
      map(() => AuthActions.logoutSuccess())
    )
  );

  loadStoredAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadStoredAuth),
      mergeMap(() => {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        console.log(userData);

        if (token && userData) {
          try {
            const user = JSON.parse(userData);
            return of(
              AuthActions.loadStoredAuthSuccess({
                name: user.name,
                email: user.email,
                token,
              })
            );
          } catch (error) {
            // Invalid stored data, clear it
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            return of({ type: 'NO_ACTION' });
          }
        }
        return of({ type: 'NO_ACTION' });
      })
    )
  );
}
