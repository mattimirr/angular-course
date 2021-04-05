import { createAction, props } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const setRecipes = createAction(
    '[Recipes] Set recipes',
    props<{ recipes: Recipe[] }>()
);

export const fetchRecipes = createAction(
    '[Recipes] Fetch Recipes'
);

export const storeRecipes = createAction(
    '[Recipes] Store Recipes'
);


export const addRecipe = createAction(
    '[Recipes] Add recipes',
    props<{ recipe: Recipe }>()
);

export const updateRecipe = createAction(
    '[Recipes] Update recipes',
    props<{ index: number, recipe: Recipe }>()
);


export const deleteRecipe = createAction(
    '[Recipes] Delete recipes',
    props<{ index: number }>()
);