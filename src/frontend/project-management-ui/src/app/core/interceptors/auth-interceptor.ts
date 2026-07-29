import {
  HttpInterceptorFn,
  HttpErrorResponse
} from '@angular/common/http';

import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

import { Auth } from '../services/auth';
//import { TokenStorageService } from '../services/token-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(Auth);
  const router = inject(Router);

  const accessToken = authService.getAccessToken();

  const refreshToken = authService.getRefreshToken();

  const authRequest = accessToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    : req;

  return next(authRequest).pipe(

    catchError((error: HttpErrorResponse) => {

      if (
        error.status !== 401 ||
        req.url.includes('/auth/login') ||
        req.url.includes('/auth/register') ||
        req.url.includes('/auth/refresh-token')
      ) {
        return throwError(() => error);
      }


      return authService.refreshToken().pipe(

        switchMap(response => {

          authService.storeTokens(
            response.accessToken,
            response.refreshToken
          );

          const retry = req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.accessToken}`
            }
          });

          return next(retry);

        }),

        catchError(err => {

          authService.clear();

          router.navigate(['/login']);

          return throwError(() => err);

        })

      );

    })

  );

};