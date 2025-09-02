import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const encodedToken = localStorage.getItem('token') || '';
  const token = atob(encodedToken);

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
