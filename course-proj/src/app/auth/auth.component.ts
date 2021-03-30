import { Component, OnDestroy } from "@angular/core";
import { Form, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router) { }

    onChangeMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        let authObservable: Observable<AuthResponseData>;

        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = true;

        if (this.isLoginMode) {
            authObservable = this.authService.login(email, password);
        } else {
            authObservable = this.authService.signup(email, password);
        }
        authObservable.subscribe(resData => {
            this.isLoading = false;
            this.router.navigate(['./recipes']);
        }, errorMessage => {
            this.error = errorMessage;
            this.isLoading = false;
        });

    }

    onHandleError() {
        this.error = null;
    }

}