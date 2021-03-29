import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService: RecipeService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.httpClient.put('https://ng-course-recipebook-c8560-default-rtdb.firebaseio.com/recipes.json',
            recipes).subscribe(response => { });
    }

    fetchRecipes() {
        this.httpClient.get<Recipe[]>('https://ng-course-recipebook-c8560-default-rtdb.firebaseio.com/recipes.json')
            .subscribe(response => {
                this.recipeService.setRecipes(response);
            });
    }
}