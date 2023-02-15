import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, tap } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  ingredients: { ingredient_id: number; ingredient_name: string; }[] = [];

  constructor(private http: HttpClient) { }

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
    
    this.http.post<any>(`http://localhost:8080/recipes/ingredients/` + recipe_id, httpOptions). subscribe(data => {
      data.forEach((element: { ingredient_id: number; ingredient_name: string; }) => {
        this.ingredients.push({ingredient_id: element.ingredient_id, ingredient_name: element.ingredient_name});
      });
      console.log(this.ingredients);
    });
  }

  getGroceryList(){
    return this.ingredients;
  }
}
