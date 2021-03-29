import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private httpclient: HttpClient) { }

    signUp(email: string, password: string) {
        return this.httpclient.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[${environment.APIKEY}]`,
            {
                email: email,
                password: password,
                returnSecureToken: true
            });
    }
}