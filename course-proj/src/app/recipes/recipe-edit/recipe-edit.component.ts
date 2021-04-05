import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducers'
import * as RecipeActions from '../store/recipe.actions'
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  private storeSub : Subscription; 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      });
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(RecipeActions.updateRecipe({ index: this.id, recipe: this.recipeForm.value }));
    } else {
      this.store.dispatch(RecipeActions.addRecipe({ recipe: this.recipeForm.value }));
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients'))
      .push(new FormGroup({
        'name': new FormControl('', Validators.required),
        'amount': new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      }))
  }

  private initForm() {
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeName = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.storeSub = this.store.select('recipes').pipe(
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) => { return index === this.id });
        })).subscribe(recipe => {
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;

          if (recipe['ingredients']) {
            for (let ing of recipe.ingredients) {
              recipeIngredients.push(new FormGroup({
                'name': new FormControl(ing.name, Validators.required),
                'amount': new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
              );
            }
          }
        });

    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get recipeIngredients() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }


  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  ngOnDestroy(){
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }
}
