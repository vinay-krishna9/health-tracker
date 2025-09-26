import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './actions';
import { AuthResponse } from '../../models/auth';

export interface AuthState {
  user: AuthResponse | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialAuthState,

  // Login
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { name, email, token }) => ({
    ...state,
    user: { name, email },
    token,
    loading: false,
    error: null,
    isAuthenticated: true,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isAuthenticated: false,
    user: null,
    token: null,
  })),

  // Logout
  on(AuthActions.logout, (state) => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.logoutSuccess, () => ({
    ...initialAuthState,
  })),

  // Load stored auth
  on(AuthActions.loadStoredAuthSuccess, (state, { name, email, token }) => ({
    ...state,
    user: { name, email },
    token,
    isAuthenticated: true,
  })),

  // Clear error
  on(AuthActions.clearError, (state) => ({
    ...state,
    error: null,
  }))
);
