import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.page.html',
  styleUrls: ['./recipe-modal.page.scss'],
})
export class RecipeModalPage implements OnInit {

  @Input() recipe: any;

  ingredients: any[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    console.log(this.recipe);
    this.getIngredients();
  }

  getIngredients(){
    this.recipeService.getIngredientForRecipe(this.recipe.recipe_id).subscribe((ingredients: any) => {
      console.log(ingredients);
      this.ingredients = ingredients;
    });
  }

  getImage(recipe_image: string): string {
    const basePath = "assets/recipe-images/"
    return basePath + recipe_image;
  }

}
