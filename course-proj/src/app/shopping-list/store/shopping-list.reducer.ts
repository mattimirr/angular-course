import { Action, createReducer, on } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    editedIngredientIndex: number;
    editedIngredient: Ingredient;
    ingredients: Ingredient[];
}

const initialState: State = {
    ingredients: [
        new Ingredient('Buns', 2), new Ingredient('Chicken', 1), new Ingredient('Ramen buns', 1)],
    editedIngredient: null,
    editedIngredientIndex: -1
};


const _shoppingListReducer = createReducer(
    initialState,
    on(ShoppingListActions.addIngredient, (state, payload) => {
        return {
            ...state,
            ingredients: state.ingredients.concat(payload.ingredient)
        };
    }),
    on(ShoppingListActions.addIngredients, (state, payload) => {
        return {
            ...state,
            ingredients: state.ingredients.concat(...payload.ingredients)
        };
    }),
    on(ShoppingListActions.updateIngredient, (state, payload) => {
        return {
            ...state,
            editedIngredientIndex: -1,
            ingredients: state.ingredients.map((ingredient, index) =>
                index === state.editedIngredientIndex ? { ...payload.ingredient } : ingredient)
        };
    }),
    on(ShoppingListActions.deleteIngredient, state => {
        return {
            ...state,
            editedIngredientIndex: -1,
            ingredients: state.ingredients.filter((_, index) => index != state.editedIngredientIndex)
        };
    }),
    on(ShoppingListActions.startEdit, (state, payload) => {
        return {
            ...state,
            editedIngredientIndex: payload.index
        };
    }),
    on(ShoppingListActions.stopEdit, state => {
        return {
            ...state,
            editedIngredientIndex: -1
        };
    })
);


export function shoppingListReducer(state: State, action: Action) {
    return _shoppingListReducer(state, action);
  }
  