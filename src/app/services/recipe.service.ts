import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, tap } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  ingredients: { ingredient_id: number; ingredient_name: string; }[] | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    
  }

  getRecipes(): Observable<any>{
    return this.http.get<any>(`http://localhost:8080/recipes/all`);
  }

  storeRecipeIngredients(recipe_id: number){
    console.log("here")
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:8100',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };
    
    this.http.post<any>(`http://localhost:8080/recipes/ingredients/` + recipe_id, httpOptions). subscribe(data => {
      this.ingredients = data;
    });
  }

  getStoredIngredients(){
    return this.ingredients;
  }
}
