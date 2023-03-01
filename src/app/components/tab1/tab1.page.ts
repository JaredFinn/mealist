import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecipeService } from 'src/app/services/recipe.service';
import { RecipeModalPage } from '../recipe-modal/recipe-modal.page';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild('modal') modal: any;

  recipes!: any[];
  filteredRecipes!: any[];
  showContent = false;

  modalOpen: boolean = false;
  openedRecipe: any;

  rows: any[] = [];
  
  slideOpts = {
		slidesPerView: 2.4,
		spaceBetween: 10,
		freeMode: true
	};

  constructor(private recipeService: RecipeService, public modalController: ModalController) { 
    this.rows = this.chunk(this.filteredRecipes, 2);
   }

  chunk(arr: any, size: any) {
    return Array.from({ length: Math.ceil(arr?.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  }


  ngOnInit(){
    this.getRecipes();
  }
  

  hideContent() {
    this.showContent = !this.showContent;
  }
 
  getRecipes() {
    this.recipeService.getRecipes().subscribe((data) => {
        this.recipes = data;
        this.filteredRecipes = this.recipes;
    });
  }

  getImage(recipe_image: string): string {
    const basePath = "assets/recipe-images/"
    return basePath + recipe_image;
  }

  addRecipeToList(event: MouseEvent, recipe_id: number){
    event.stopPropagation();
    this.recipeService.storeRecipeIngredients(recipe_id);
  }

  addFeaturedRecipe(){
    this.recipeService.storeRecipeIngredients(8);
  }

  searchRecipes(query: any){
    this.hideContent();
      this.filteredRecipes = this.recipes.filter((recipe: any) => 
          recipe.recipe_name.toLowerCase().includes(query.detail.value.toLowerCase()));
  }

  async openModal(recipe: any) {

    const modal = await this.modalController.create({
      component: RecipeModalPage,
      componentProps: {recipe: recipe},
      cssClass: 'modal'
    })
    
    await modal.present();
  }

  // async closeModal(){
  // }
  
}
