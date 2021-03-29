import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "./user.model";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new Subject<User>();

    constructor(private httpclient: HttpClient) { }

    signUp(email: string, password: string) {
        return this.httpclient.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.APIKEY}`,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(
                catchError(this.handleError),
                tap(respData => {
                    this.handleAuth(respData.email, respData.localId, respData.idToken, +respData.expiresIn)
                })
            );
    }

    logIn(email: string, password: string) {
        return this.httpclient.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.APIKEY}`,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(
                catchError(this.handleError),
                tap(respData => {
                    this.handleAuth(respData.email, respData.localId, respData.idToken, +respData.expiresIn)
                }));
    }

    private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );

        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "The email provided is already registered";
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "The email was not found as registered";
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "The password for the user is not correct";
                break;
            case 'USER_DISABLED':
                errorMessage = "This account has been disabled";
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = "Password Error";
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = "Too many attempts";
                break;
            default:
                errorMessage = 'An unknown error occurred!'
        }
        return throwError(errorMessage);
    }
}