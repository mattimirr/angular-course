import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take } from "rxjs/operators";
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';

import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private store: Store<fromApp.AppState>) { }
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
            exhaustMap(user => {

                if (!user) {
                    return next.handle(request);
                }
                const modifiedRequest = request.clone(
                    {
                        params: new HttpParams().set('auth', user.token)
                    });
                return next.handle(modifiedRequest);
            })
        );
    }
}