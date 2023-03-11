import { Component } from '@angular/core';
import { ListItem } from 'src/app/models/list-item.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  groceryList: any = [];
  filteredGroceryList: any = [];

  selectedItemIds: number[] = []

  constructor(private recipeService: RecipeService, public alertController: AlertController) {
    
  }

  async openAlert() {
    const alert = await this.alertController.create({
      header: 'List Options',
      buttons: [
        {
          text: 'Delete All',
          cssClass: 'option-delete',
          handler: () => {
            this.deleteSelected(this.groceryList.map((item:any) => item.item_id));
          }
        },
        {
          text: 'Delete Selected',
          cssClass: 'option-delete',
          handler: () => {
            this.deleteSelected(this.selectedItemIds);
          }
        },
        {
          text: 'Cancel',
          cssClass: 'option-cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    await alert.present();
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

  handleMenuEvent(event: any){
    event.preventDefault();
    switch(event.detail.value){
      case 'Delete Selected':
        this.deleteSelected(this.selectedItemIds);
        break;
      case 'Delete All':
        this.deleteSelected(this.groceryList.map((item:any) => item.item_id));
        break;
      default:
        break;
    }
  }

  handleCheckbox(event: any, item: any){
    if(event.detail.checked){
      this.selectedItemIds.push(item.item_id);
    }else{
      this.selectedItemIds.splice(this.selectedItemIds.findIndex(id => id == item.item_id), 1);
    }
    console.log(this.selectedItemIds)
  }

  deleteSelected(items: number[]){
    this.recipeService.deleteItems(items).subscribe((data: any) => {
      this.groceryList = data;
      this.filteredGroceryList = this.groceryList;
      this.selectedItemIds = [];
    });
  }

  filterItems(query: any) {
    this.filteredGroceryList = this.groceryList.filter((item: any) => 
        item.ingredient_name.toLowerCase().includes(query.detail.value.toLowerCase()));
  }

  handleMeasurementSpelling(itemMeasurement: string, itemQty: number){
    if(itemQty > 1){
      let measurement = '';

      switch(itemMeasurement){
        case 'foot':
          measurement = 'feet';
          break;
        case 'inch':
          measurement = 'inches'
          break;
        default:
          measurement = itemMeasurement + 's';        
      }

      return measurement;

    }else{
      return itemMeasurement;
    }
  }
  
  handleEmptyCategory(category: string){
    return this.groceryList.some((item:any) => item.item_category === category);
  }

}
