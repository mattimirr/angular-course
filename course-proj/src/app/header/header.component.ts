import { Component, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import { map } from "rxjs/operators";
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    isAuthenticated = false;

    constructor(
        private store: Store<fromApp.AppState>) { }

    ngOnInit() {
        this.subscription = this.store.select('auth')
            .pipe(map(authState => authState.user))
            .subscribe(user => {
                this.isAuthenticated = !!user;
            });
    }

    onSaveData() {
        this.store.dispatch(RecipeActions.storeRecipes());
    }

    onFetchData() {
        this.store.dispatch(RecipeActions.fetchRecipes());
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onLogout() {
        this.store.dispatch(AuthActions.logout());
    }
}