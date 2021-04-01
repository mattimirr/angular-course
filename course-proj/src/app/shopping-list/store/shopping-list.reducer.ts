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
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const newIngredient = {
                ...ingredient,
                ...action.payload
            };
            const updIngredients = [...state.ingredients];
            updIngredients[state.editedIngredientIndex] = newIngredient;

            return {
                ...state,
                ingredients: updIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((value, index) => {
                    return index !== state.editedIngredientIndex;
                }),
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        case ShoppingListActions.START_EDIT:

            return {
                ...state,
                editedIngredient: { ...state.ingredients[action.payload] },
                editedIngredientIndex: action.payload
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        default:
            return state;
    }
}