import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  recipes: { recipe_id: number; recipe_name: string; recipe_image: string; }[] | undefined;
  showContent = false;
  
  slideOpts = {
		slidesPerView: 2.4,
		spaceBetween: 10,
		freeMode: true
	};

  constructor(private recipeService: RecipeService) {  }


  ngOnInit(){
    this.getRecipes();
  }

  hideContent() {
    this.showContent = !this.showContent;
  }

  getRecipes() {
    this.recipeService.getRecipes().subscribe((data) => {
        this.recipes = data;
    });
  }

  getImage(recipe_image: string): string {
    const basePath = "assets/recipe-images/"
    return basePath + recipe_image;
  }

  addRecipeToList(recipe_id: number){
    this.recipeService.storeRecipeIngredients(recipe_id);
  }

  addFeaturedRecipe(){
    this.recipeService.storeRecipeIngredients(8);
  }
}
