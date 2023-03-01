import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, tap } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { ListItem } from '../models/list-item.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  groceryList: any[] = [];

  constructor(private http: HttpClient) { 
    this.getListFromDB();
  }

  ngOnInit() {
    
  }

  getRecipes(): Observable<any>{
    return this.http.get<any>(`http://localhost:8080/recipes/all`);
  }

  storeRecipeIngredients(recipe_id: number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:8100',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };
    this.http.post<any>(`http://localhost:8080/recipes/ingredients/` + recipe_id, httpOptions).subscribe(() => {
        this.getListFromDB();
    });
  }

  getListFromDB(){
    this.http.get<any>(`http://localhost:8080/list`).subscribe((data: any) => {
      this.groceryList = data;
      console.log(this.groceryList)
  });;
  }

  getIngredientForRecipe(recipe_id: number){
    return this.http.get<any>(`http://localhost:8080/recipes/ingredients/${recipe_id}`);
  }

  getGroceryList(){
    return this.groceryList;
  }

  deleteItems(items: number[]){
    
  }
}
