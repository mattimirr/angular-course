import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Actions, ofType } from '@ngrx/effects';
import { of } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";

import { Recipe } from "./recipe.model";
import * as fromApp from '../store/app.reducers'
import * as RecipeActions from './store/recipe.actions'


@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<{recipes: Recipe[]}> {
    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.store.select('recipes').pipe(
            take(1),
            map(recipesState => {
                return recipesState.recipes;
            }),
            switchMap(recipes => {
                if (recipes.length === 0) {
                    this.store.dispatch(RecipeActions.fetchRecipes());
                    return this.actions$.pipe(
                        ofType(RecipeActions.setRecipes),
                        take(1)
                    );
                } else {
                    return of({ recipes });
                }
            })
        );
    }
}
