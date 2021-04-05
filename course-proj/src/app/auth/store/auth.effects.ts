import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import * as AuthActions from './auth.actions';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (resData) => {
  const expirationDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000
  );
  const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return (AuthActions.authenticateSuccess({
    email: resData.email,
    userId: resData.localId,
    token: resData.idToken,
    expirationDate: expirationDate,
    redirect: true
  }));
};

const handleError = (errorRes) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(AuthActions.authenticateFail({ errorMessage: errorMessage }));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(AuthActions.authenticateFail({ errorMessage: errorMessage }));
}


@Injectable()
export class AuthEffects {

  authLogin = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginStart),
    switchMap((action) => {
      return this.http
        .post<AuthResponseData>(
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
          environment.APIKEY,
          {
            email: action.email,
            password: action.password,
            returnSecureToken: true
          }
        )
        .pipe(
          tap(respData => {
            this.authService.setLogoutTimer(+respData.expiresIn * 1000);
          }),
          map(resData => {
            return handleAuthentication(resData);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  ));


  authRedirect = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.authenticateSuccess),
    tap((authSuccessAction) => {
      if (authSuccessAction.redirect) {
        this.router.navigate(['/']);
      }
    })
  ), { dispatch: false });

  authLogout = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  ), { dispatch: false });


  authSignup = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.signupStart),
    switchMap((action) => {
      return this.http
        .post<AuthResponseData>(
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
          environment.APIKEY,
          {
            email: action.email,
            password: action.password,
            returnSecureToken: true
          }
        )
        .pipe(
          tap(respData => {
            this.authService.setLogoutTimer(+respData.expiresIn * 1000);
          }),
          map(resData => {
            return handleAuthentication(resData);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  ));

  autoLogin = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.autoLogin),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'Damm' };
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {

        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return (AuthActions.authenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirect: false
        }));
      }
      return { type: 'Damm' };
    })
  ))

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }
}