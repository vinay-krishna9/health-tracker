import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

const excludedUrls = ['/auth/login', '/auth/register'];

const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000; // exp is seconds → ms
    return Date.now() > expiry;
  } catch {
    return true;
  }
};

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const encodedToken = localStorage.getItem('token') || '';
  const token = atob(encodedToken);

  // 🚫 Skip auth header for excluded URLs
  if (excludedUrls.some((url) => req.url.includes(url))) {
    return next(req);
  }

  // 🔑 Check token validity before sending
  if (token && isTokenExpired(token)) {
    localStorage.removeItem('token');
    router.navigate(['/login']);
    throw new Error('Token expired');
  }

  let apiReq = req;
  if (token) {
    apiReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(apiReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Token expired or unauthorized → logout user
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
