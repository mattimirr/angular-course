

import { Recipe } from "./recipe.model";

export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('Chicken Burger', 'A chicken burger made by Joshua', 'https://pbs.twimg.com/media/EA-43Z0XYAAGEgz.jpg'),
        new Recipe('Ramen Burger', 'Ramen Burger made by George Motz ', 'https://images.firstwefeast.com/images/c_fill,f_auto,fl_lossy,h_416,q_auto,w_740/n5ick1hfersraz7s4rsl/ramen-burger')
  ];

  
  getRecipes() {
    return this.recipes.slice();
  }

}