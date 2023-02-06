import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    
  }

  getRecipes(): Observable<any>{
    return this.http.get<any>('http://localhost:8080/recipes');
  }
}
