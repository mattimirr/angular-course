import { Action, createReducer, on } from "@ngrx/store";
import { Recipe } from "../recipe.model";
import * as RecipeActions from './recipe.actions'
export interface State {
    recipes: Recipe[];
}
const initialState: State = {
    recipes: []
};

const _recipeReducer = createReducer(
    initialState,
    on(RecipeActions.setRecipes, (state, payload) => ({ ...state, recipes: [...payload.recipes] }))
);

export function recipeReducer(state: State, action: Action) {
    return _recipeReducer(state, action);
  }
  