import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        this.authService.user.subscribe()
        return this.authService.user.pipe(
            take(1),
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