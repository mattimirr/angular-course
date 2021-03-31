import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

export interface AppState {
    shoppingList: State;
}
const initialState: State = {
    ingredients: [
        new Ingredient('Buns', 2), new Ingredient('Chicken', 1), new Ingredient('Ramen buns', 1),
        new Ingredient('Minced Meat in kilograms', 1)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.index];
            const newIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const updIngredients = [...state.ingredients];
            updIngredients[action.payload.index] = newIngredient;

            return {
                ...state,
                ingredients: updIngredients
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((value, index) => {
                    return index !== action.payload;
                })
            };
        default:
            return state;
    }
}