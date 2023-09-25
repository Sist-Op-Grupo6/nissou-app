import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "./data-service.service";
import {Product} from "../models/product";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends DataService<Product>{

  constructor(http: HttpClient) {
    super(http);
    this.basePath = 'http://localhost:3000/products';
  }
  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.basePath}?categoryId=${categoryId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
