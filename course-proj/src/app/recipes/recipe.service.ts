import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipesChanges = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Chicken Burger', 'A chicken burger made by Joshua', 'https://pbs.twimg.com/media/EA-43Z0XYAAGEgz.jpg',
      [new Ingredient('Chicken', 1), new Ingredient('Buns', 1)]),
    new Recipe('Ramen Burger', 'Ramen Burger made by George Motz ',
      'https://images.firstwefeast.com/images/c_fill,f_auto,fl_lossy,h_416,q_auto,w_740/n5ick1hfersraz7s4rsl/ramen-burger',
      [new Ingredient('Ramen Bun', 1), new Ingredient('Miced Meat in kilograms', 500)])
  ];

  constructor(private shoppingListService: ShoppingListService) { }


  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanges.next(this.recipes.slice());
  }

  editRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanges.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanges.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanges.next(this.recipes.slice());
  }

}