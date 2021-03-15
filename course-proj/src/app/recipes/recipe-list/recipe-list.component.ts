import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Burger', 'A burger made by Joshua', 'https://pbs.twimg.com/media/EA-43Z0XYAAGEgz.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
