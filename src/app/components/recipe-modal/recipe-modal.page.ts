import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.page.html',
  styleUrls: ['./recipe-modal.page.scss'],
})
export class RecipeModalPage implements OnInit {

  @Input() recipe: any;
  @Input() isCurrentFavorite: any;

  ingredients: any[] = [];

  ingredientsToAdd: any[] = [];

  isFavorite = false;

  constructor(private recipeService: RecipeService, private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.recipe);
    this.getIngredients();
    if(this.isCurrentFavorite){
      this.isFavorite = this.isCurrentFavorite;
    }
  }

  getIngredients(){
    this.recipeService.getIngredientForRecipe(this.recipe.recipe_id).subscribe((ingredients: any) => {
      console.log(ingredients);
      this.ingredients = ingredients;
      this.ingredientsToAdd = ingredients.slice();
    });
  }

  toggleFavorite(recipe_id: number) {
    this.isFavorite = !this.isFavorite;
    if(this.isFavorite){
      this.recipeService.addFavorite(recipe_id);
    }else{
      this.recipeService.removeFavorite(recipe_id);
    }
  }

  getImage(recipe_image: string): string {
    const basePath = "assets/recipe-images/"
    return basePath + recipe_image;
  }

  addIngredientsToList(){
    this.recipeService.addToListByIngredients(this.recipe.recipe_id, this.ingredientsToAdd);
    this.modalController.dismiss();
  }


  handleToggle(ingredient: any, event: any){
    if(event.detail.checked){
      this.ingredientsToAdd.push(ingredient);
    }else{
      console.log(event.detail.checked)
      const indexToRemove = this.ingredientsToAdd.findIndex(item => item.ingredient_id === ingredient.ingredient_id);
      this.ingredientsToAdd.splice(indexToRemove, 1);
    }
  }

}
