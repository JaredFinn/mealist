import { Component } from '@angular/core';
import { ListItem } from 'src/app/models/list-item.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  groceryList: any = [];
  filteredGroceryList: any = [];

  selectedItemIds: number[] = []

  constructor(private recipeService: RecipeService) {
    
  }


  //gets called every time tab component is in view
  ionViewDidEnter(): void{
    //Get Grocery List
    this.getList();
    
  }

  getList() {
    this.groceryList = this.recipeService.getGroceryList();
    this.filteredGroceryList = this.groceryList;
  }

  handleEvent(event: any){
    event.preventDefault();
    switch(event.detail.value){
      case 'Delete Selected':
        this.deleteSelected();
        break;
      default:
        break;
    }
  }

  handleCheckbox(event: any, item: any){
    if(event.detail.checked){
      this.selectedItemIds.push(item.ingredient_id);
    }else{
      this.selectedItemIds.splice(this.selectedItemIds.findIndex(id => id == item.ingredient_id), 1);
    }
    console.log(this.selectedItemIds)
  }

  deleteSelected(){
    this.recipeService.deleteItems(this.selectedItemIds);
  }

  filterItems(query: any) {
    this.filteredGroceryList = this.groceryList.filter((item: any) => 
        item.ingredient_name.toLowerCase().includes(query.detail.value.toLowerCase()));
  }

  
}
