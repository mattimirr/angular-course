import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
    ;
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import * as RecipeActions from "./recipe.actions";
import * as fromApp from "../../store/app.reducers";


@Injectable()
export class RecipeEffects {
    storeRecipes = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipeActions.storeRecipes),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([actionData, recipesState]) => {
                return this.http.put('https://ng-course-recipebook-c8560-default-rtdb.firebaseio.com/recipes.json',
                    recipesState.recipes
                );
            })
        ), { dispatch: false }
    );

    fetchRecipes = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipeActions.fetchRecipes),
            switchMap(() => {
                return this.http.get<Recipe[]>(
                    'https://ng-course-recipebook-c8560-default-rtdb.firebaseio.com/recipes.json'
                );
            }),
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }),
            map(recipes => {
                return (RecipeActions.setRecipes({ recipes }));
            })
        ));


    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>) { }
}