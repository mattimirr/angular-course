import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy{
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    private closeSub: Subscription;

    constructor(private authService: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver) { }

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
            console.log(errorMessage)
            this.showErrorAlert(errorMessage);
            this.isLoading = false;
        });

    }

    onHandleError() {
        this.error = null;
    }
    ngOnDestroy(){
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }

    private showErrorAlert(message: string) {
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostviewContainerRef = this.alertHost.viewContainerRef;
        hostviewContainerRef.clear();

        const componentRef = hostviewContainerRef.createComponent(alertCmpFactory);

        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostviewContainerRef.clear();
        })
    }

}