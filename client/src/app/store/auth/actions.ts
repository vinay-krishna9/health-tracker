import { createAction, props } from '@ngrx/store';

// Register Actions
export const register = createAction(
  '[Auth] Register',
  props<{ credentials: { email: string; name: string; password: string } }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ name: string; email: string; token: string }>()
);

export const registerFailure = createAction('[Auth] Register Failure', props<{ error: string }>());

// Login Actions
export const login = createAction(
  '[Auth] Login',
  props<{ credentials: { email: string; password: string } }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ name: string; email: string; token: string }>()
);

export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

// Logout Actions
export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

// Load stored auth data (on app init)
export const loadStoredAuth = createAction('[Auth] Load Stored Auth');

export const loadStoredAuthSuccess = createAction(
  '[Auth] Load Stored Auth Success',
  props<{ name: string; email: string; token: string }>()
);

// Clear error
export const clearError = createAction('[Auth] Clear Error');
