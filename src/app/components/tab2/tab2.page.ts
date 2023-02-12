import { Component } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  ingredients: { ingredient_id: number; ingredient_name: string; }[] | undefined;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(){
    this.ingredients = this.recipeService.getStoredIngredients();
  }

}
