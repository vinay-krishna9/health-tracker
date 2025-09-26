import { provideStoreDevtools } from '@ngrx/store-devtools';

export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000',
  providers: [provideStoreDevtools({ maxAge: 25 })],
};
