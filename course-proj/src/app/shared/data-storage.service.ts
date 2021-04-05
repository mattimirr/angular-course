import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from 'rxjs/operators';
import { Store } from "@ngrx/store";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import * as fromApp from "../store/app.reducers";
import * as RecipeActions from "../recipes/store/recipe.actions";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(
        private httpClient: HttpClient, 
        private recipeService: RecipeService,
         private store: Store<fromApp.AppState>,) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.httpClient.put('https://ng-course-recipebook-c8560-default-rtdb.firebaseio.com/recipes.json',
            recipes).subscribe(response => { });
    }

    fetchRecipes() {
        return this.httpClient
            .get<Recipe[]>(
                'https://ng-course-recipebook-c8560-default-rtdb.firebaseio.com/recipes.json'
            ).pipe(
                map((recipes) => {
                    return recipes.map(recipe => {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                    });
                }),
                tap(recipes => {
                    this.store.dispatch(RecipeActions.setRecipes({recipes}))
                }));

    }
}