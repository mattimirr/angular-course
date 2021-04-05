import { Action, createReducer, on } from "@ngrx/store";
import { Recipe } from "../recipe.model";
import { RecipesComponent } from "../recipes.component";
import * as RecipeActions from './recipe.actions'
export interface State {
    recipes: Recipe[];
}
const initialState: State = {
    recipes: []
};

const _recipeReducer = createReducer(
    initialState,
    on(RecipeActions.setRecipes, (state, payload) => ({ ...state, recipes: [...payload.recipes] })),
    on(RecipeActions.addRecipe, (state, payload) => (
        {
            ...state,
            recipes: [...state.recipes, payload.recipe]
        })
    ),
    on(RecipeActions.updateRecipe, (state, payload) => (
        {
            ...state,
            recipes: state.recipes.map((recipe, index) => index === payload.index ? { ...payload.recipe } : recipe)
        })
    ),
    on(RecipeActions.deleteRecipe, (state, payload) => (
        {
            ...state,
            recipes: state.recipes.filter((_, index) => index !== payload.index)
        })
    )
);

export function recipeReducer(state: State, action: Action) {
    return _recipeReducer(state, action);
}
