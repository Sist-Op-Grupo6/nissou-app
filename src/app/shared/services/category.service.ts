import { Injectable } from '@angular/core';
import {Category} from "../models/category";
import {DataService} from "./data-service.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends DataService<Category>{
  constructor(http: HttpClient) {
    super(http);
    this.basePath = 'http://localhost:3000/categories';
  }

  getById(categoryId: number): Observable<Category> {
    const url = `${this.basePath}/${categoryId}`;
    return this.http.get<Category>(url, this.httpOptions);
  }

  getProductsForCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.basePath}/${categoryId}/products`);
  }

}
