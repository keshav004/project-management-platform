import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://localhost:44318/api/Auth';

  private readonly accessTokenKey = 'access_token';
  private readonly refreshTokenKey = 'refresh_token';


  login(
    request: LoginRequest
  ): Observable<LoginResponse> {

    return this.http
      .post<LoginResponse>(
        `${this.apiUrl}/login`,
        request
      )
      .pipe(

        tap(response => {

          this.storeTokens(
            response.accessToken,
            response.refreshToken
          );

        })

      );
  }

  register(
    request: any
    ): 
    Observable<any> {
    return this.http
    .post<any>(
      `${this.apiUrl}/register`, 
        request);
  }

  private storeTokens(
    accessToken: string,
    refreshToken: string
  ): void {

    localStorage.setItem(
      this.accessTokenKey,
      accessToken
    );

    localStorage.setItem(
      this.refreshTokenKey,
      refreshToken
    );
  }


  getAccessToken(): string | null {

    return localStorage.getItem(
      this.accessTokenKey
    );
  }


  getRefreshToken(): string | null {

    return localStorage.getItem(
      this.refreshTokenKey
    );
  }


  isAuthenticated(): boolean {

    return !!this.getAccessToken();

  }


  logout(): void {

    localStorage.removeItem(
      this.accessTokenKey
    );

    localStorage.removeItem(
      this.refreshTokenKey
    );

  } 
}
